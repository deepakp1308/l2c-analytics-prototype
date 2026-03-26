export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#E5E7EB]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FAFB] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-[13px] text-[#212B36]">
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
