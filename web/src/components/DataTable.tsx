export default function DataTable({ data }: { data: Record<string, any>[] }) {
  const firstEl = data[0];
  const keys = firstEl === undefined ? [] : Object.keys(firstEl);
  if (data.length === 0 || firstEl === undefined) return null;

  return (
    <div className="max-w-screen col center items-start overflow-hidden">
      <table className="w-fit overflow-x-scroll">
        <thead>
          {keys.map((k) => (
            <th key={k}>{k}</th>
          ))}
        </thead>
        <tbody>
          {data.map((el, idx) => (
            <tr key={idx}>
              {keys.map((k) => (
                <td key={k}>{el[k].toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
