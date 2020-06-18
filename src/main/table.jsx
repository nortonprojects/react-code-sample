import React from 'react';
import {useTable, usePagination} from 'react-table';

export default function Table({tableData = [], tableColumns = []}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
    state: {
      pageIndex,
    }
  } = useTable({ columns: tableColumns, data: tableData}, usePagination);

  return tableData && tableData.length > 0 ? (
    <div className="flex flex-col justify-between h-full">
      <div className="overflow-x-scroll">
        <table {...getTableProps()} className="mx-auto">
          <thead className="border-b-2 border-palette-black rounded">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="py-2 px-4">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className="border-t border-palette-black">
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="py-2 px-4">
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </div>
  ) : (<p className="text-center w-full">Waiting for data&#8230;</p>);
}