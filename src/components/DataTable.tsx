export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#D9D9D9]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F4F4EF] border-b border-[#D9D9D9]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-[#8C8C8C] uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#E8E8E8] last:border-0 hover:bg-[#F4F4EF] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-[13px] text-[#0D333F]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
