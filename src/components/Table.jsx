export default function Table({ headers, rows }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-az-75">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-az-85">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-2.5 font-semibold text-az-25 border-b border-az-75">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-az-85 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-az-35">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
