#!/usr/bin/env node
/**
 * Type-check the book's Azora examples against the real compiler.
 *
 * Every <CodeBlock> whose text begins with `module ` is a complete program and
 * is handed to `azora check`. Blocks that do not begin with `module ` are
 * fragments quoted for illustration and are skipped.
 *
 *   node scripts/check-examples.mjs [edition]
 *
 * AZORA_BIN overrides the compiler path.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const run = promisify(execFile)
const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const edition = process.argv[2] || '0.1-dev'
const contentDir = path.join(root, 'src', 'content', edition)

const AZORA = process.env.AZORA_BIN
  || path.resolve(root, '..', 'azora-lang', 'app', 'build', 'install', 'azora', 'bin', 'azora')

/** Pull the text of every <CodeBlock>{`…`}</CodeBlock> out of a JSX source. */
function codeBlocks(source) {
  const blocks = []
  const open = '<CodeBlock>{`'
  const close = '`}</CodeBlock>'
  let at = 0
  for (;;) {
    const start = source.indexOf(open, at)
    if (start < 0) break
    const end = source.indexOf(close, start)
    if (end < 0) break
    blocks.push(source.slice(start + open.length, end))
    at = end + close.length
  }
  return blocks
}

/** JSX template literals escape `${` and backticks; undo that for the compiler. */
function unescape(code) {
  return code.replace(/\\\$\{/g, '${').replace(/\\`/g, '`').replace(/\\\\/g, '\\')
}

const files = (await fs.readdir(contentDir)).filter((f) => f.endsWith('.jsx'))
const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'azbook-'))

let checked = 0
let skipped = 0
const failures = []

for (const file of files) {
  const source = await fs.readFile(path.join(contentDir, file), 'utf8')
  const blocks = codeBlocks(source)
  for (const [index, raw] of blocks.entries()) {
    const code = unescape(raw).trim()
    if (!code.startsWith('module ')) { skipped += 1; continue }

    const name = `${file.replace(/\.jsx$/, '')}-${index}.az`
    const onDisk = path.join(tmp, name)
    await fs.writeFile(onDisk, code + '\n')
    checked += 1
    try {
      await run(AZORA, ['check', onDisk], { timeout: 120000 })
    } catch (error) {
      const out = `${error.stdout || ''}${error.stderr || ''}`.trim()
      failures.push({ file, index, message: out.split('\n').slice(0, 4).join('\n') })
    }
  }
}

console.log(`edition ${edition}: ${checked} complete programs checked, ${skipped} fragments skipped`)
if (failures.length) {
  console.error(`\n${failures.length} example(s) failed:\n`)
  for (const f of failures) {
    console.error(`  ${f.file} block #${f.index}`)
    console.error(f.message.split('\n').map((l) => `      ${l}`).join('\n'))
    console.error('')
  }
  process.exit(1)
}
console.log('all complete examples type-check')
