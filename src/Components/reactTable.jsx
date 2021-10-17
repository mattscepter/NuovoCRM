import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import './table.css';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { CSVLink } from 'react-csv';
import { Refresh } from '@material-ui/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import { setConfirmation } from '../context/actions/confirmationAction';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="font-semibold">
      Search:{' '}
      <input
        className={`ml-2 px-2 py-1 focus:outline-none rounded-md focus:ring-1 ring-red-1 `}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

function dateBetweenFilterFn(rows, id, filterValues) {
  let sd = new Date(filterValues[0]);
  let ed = new Date(filterValues[1]);
  console.log(rows, id, filterValues);
  return rows.filter((r) => {
    var time = new Date(r.values[id]);
    console.log(time, ed, sd);
    if (filterValues.length === 0) return rows;
    return time >= sd && time <= ed;
  });
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

dateBetweenFilterFn.autoRemove = (val) => !val;

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({
  columns,
  data,
  customer,
  not_customer,
  deleteFunc,
  update,
  path,
  refresh,
  tablepath,
  text,
  isInventory,
}) {
  const [dataExport, setdataExport] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  // Use the state and functions returned from useTable to build your UI

  const [customerType, setCustomerType] = useState('All');

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      dateBetween: dateBetweenFilterFn,

      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    visibleColumns,
    state,
    setGlobalFilter,
    setAllFilters,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data:
        customerType === 'All'
          ? data
          : customerType === 'Customer'
          ? customer
          : not_customer,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  useEffect(() => {
    var keys = Object.keys(selectedRowIds);
    var downloads = new Array();
    keys.forEach(function (item, index) {
      downloads.push(data[item]);
    });

    setdataExport(downloads);
  }, [selectedRowIds]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Render the UI for your table
  return (
    <>
      <div className="w-full flex justify-end bg-white mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="pl-1">
            <Tooltip title="Refresh">
              <IconButton onClick={() => dispatch(refresh())}>
                <Refresh style={{ fontSize: '35px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export data">
              <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ outlineWidth: '0' }}
              >
                <DownloadForOfflineIcon style={{ fontSize: '35px' }} />
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <CSVLink data={dataExport}>Download Selected</CSVLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <CSVLink data={data}>Download All</CSVLink>
              </MenuItem>
            </Menu>
            <Tooltip title="Clear all filters">
              <IconButton
                onClick={() => {
                  setAllFilters([]);
                }}
              >
                <CancelIcon style={{ fontSize: '35px' }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="pagination">
            <div className="flex flex-col sm:flex-row justify-center items-center">
              <div className="flex flex-row">
                <Tooltip title="First Page">
                  <IconButton
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <FirstPageIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Previous Page">
                  <IconButton
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <NavigateBeforeIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Next Page">
                  <IconButton
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <NavigateNextIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Last Page">
                  <IconButton
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <LastPageIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="flex items-center justify-center">
                <span>
                  Page
                  <strong className="mr-1">
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                </span>
                <div className="hidden sm:flex">
                  <span>
                    | Go to page:
                    <input
                      className={`px-2 py-1 mx-1 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                      type="number"
                      defaultValue={pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        gotoPage(page);
                      }}
                      style={{ width: '100px' }}
                    />
                  </span>
                </div>
                <select
                  className={`py-1 px-2 mx-1 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-red-1`}
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 bg-white overflow-x-auto">
        <table {...getTableProps()}>
          <thead>
            <tr>
              <th
                colSpan={visibleColumns.length + 2}
                style={{
                  textAlign: 'left',
                }}
              >
                <div className="flex items-center justify-between">
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                  <div className="flex items-center">
                    {!isInventory ? (
                      <div className="font-semibold">
                        <label>Contact type: </label>
                        <select
                          className="border border-gray-300 rounded-md mr-4 outline-none"
                          value={customerType}
                          onChange={(e) => setCustomerType(e.target.value)}
                        >
                          <option selected value="All">
                            All
                          </option>
                          <option value="Customer">Customer</option>
                          <option value="Not a customer">Not a customer</option>
                        </select>
                      </div>
                    ) : null}
                    {headerGroups.map((headerGroup) =>
                      headerGroup.headers.map((column) => (
                        <>
                          {column.canFilter && column.Header === 'Created At'
                            ? column.render('Filter')
                            : null}
                        </>
                      )),
                    )}
                  </div>
                </div>
              </th>
            </tr>

            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownwardIcon />
                        ) : (
                          <ArrowUpwardIcon />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                    {/* <div>
                      {column.canFilter && column.Header === 'Created At'
                        ? column.render('Filter')
                        : null}
                    </div> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  <>
                    {row.cells.map((cell, index) => {
                      return (
                        <>
                          {cell.column.id === 'item_name' ||
                          cell.column.id === 'name' ||
                          cell.column.id === 'company' ? (
                            <td
                              key={index}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                dispatch(update(data[row.id]));
                                history.push(
                                  `${tablepath}/${data[row.id]._id}`,
                                );
                              }}
                              {...cell.getCellProps()}
                            >
                              {cell.render('Cell')}
                            </td>
                          ) : (
                            <td key={index} {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          )}
                        </>
                      );
                    })}
                  </>
                  <td className="w-max p-1 px-0">
                    <div className="flex justify-evenly items-center">
                      <IconButton
                        onClick={() => {
                          dispatch(
                            setConfirmation({
                              show: true,
                              text: text,
                              func: () => {
                                dispatch(deleteFunc(data[row.id]._id));
                              },
                            }),
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <div className="h-6 bg-gray-300 border border-r-1"></div>
                      <IconButton
                        onClick={() => {
                          dispatch(update(data[row.id]));
                          history.push(path);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
