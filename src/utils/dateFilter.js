import { useMemo } from 'react';

function DateRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className="flex font-semibold items-center">
      <p className="mr-4 ">Filter by date: </p>
      <div>
        <input
          min={min.toISOString().slice(0, 10)}
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [val ? val : undefined, old[1]]);
          }}
          type="date"
          value={filterValue[0] || ''}
          className="border border-gray-300 p-1 rounded-lg"
        />
        {' to '}
        <input
          max={max.toISOString().slice(0, 10)}
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              old[0],
              val ? val.concat('T23:59:59.999Z') : undefined,
            ]);
          }}
          type="date"
          value={filterValue[1]?.slice(0, 10) || ''}
          className="border border-gray-300 p-1 rounded-lg"
        />
      </div>
    </div>
  );
}

export default DateRangeColumnFilter;
