import { BarsArrowDownIcon, BarsArrowUpIcon, CalendarDaysIcon, EnvelopeIcon, PencilIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useState } from 'react';
import InputWithIcon from '../inputs/input-with-icon/input-with-icon';
import DatePicker from '../date-picker/date-picker';

export default function Table({ jsonData, title }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [columnTitles, setColumnTitles] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const rowIndices = jsonData.data.map((item) => item.id);
      setSelectedItems(rowIndices);
    } else {
      setSelectedItems([]);
    }
  };

  const handleRowCheckboxChange = (rowIndex) => {
    const newSelectedItems = selectedItems.includes(rowIndex)
      ? selectedItems.filter((item) => item !== rowIndex)
      : [...selectedItems, rowIndex];
    setSelectedItems(newSelectedItems);
  };

  const handleSort = (fieldName) => {
    if (sortField === fieldName) {
      // Toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new sort field and direction
      setSortField(fieldName);
      setSortDirection('asc');
    }
  };

  const sortedData = [...jsonData.data];

  if (sortField) {
    // Sort the data based on the current sortField and sortDirection
    sortedData.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = sortedData.slice(startIndex, endIndex);

  const { titles, data } = jsonData;

  if (titles && titles.length > 0 && !columnTitles.length) {
    setColumnTitles(titles);
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <div className="relative mt-4 overflow-x-auto">
      <div class="block md:flex justify-between pb-4 items-center">
        <div className="md:pb-3"> 
          <h5 className='mb-2 text-lg mdtext-2xl font-bold tracking-tight text-acc-color'>{title}</h5>
        </div>
        <div className="flex table-left">
          <div className='mr-3'>
            <InputWithIcon type="text" value={searchQuery} change={(e) => setSearchQuery(e.target.value)} icon={<EnvelopeIcon className="h-5 w-5 text-primary" />} placeholder="Search" />
          </div>
          <DatePicker Icon={CalendarDaysIcon} title={"Select Date"} color="acc-color"/>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:border-gray-700">
        <thead className="text-xs text-acc-color bg-gray border-b border-border-lines">
          <tr>
            <th scope="col" className="py-3" style={{ maxWidth: '200px' }}>
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-acc-color"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            {columnTitles.map((title, index) => (
              <th key={index} scope="col" className="px-6 text-[14px] py-3 cursor-pointer" onClick={() => handleSort(title)} style={{ maxWidth: '200px' }}>
                <span className='mr-2'>{title}</span>
                <BarsArrowDownIcon strokeWidth={2} className="w-4 h-4 inline-block" />
              </th>
            ))}
            <th scope="col" className="px-6 py-3" style={{ maxWidth: '200px' }}>
              Action 
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((item, index) => (
              <tr
                key={item.id}
                className={`bg-white border-hidden !text-acc-color-2 dark:bg-gray-900 dark:border-gray-700 ${
                  index === data.length - 1 ? '' : 'border-b'
                }`}
              >
                <td className="py-2" style={{ maxWidth: '200px' }}>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-acc-color"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleRowCheckboxChange(item.id)}
                  />
                </td>
                {Object.keys(item)
                  .filter((key) => key !== 'id') 
                  .map((key) => (
                    <td key={key} className="px-6 py-2" style={{ maxWidth: '200px' }}>
                      {item[key]}
                    </td>
                  ))}
                <td className="px-6 py-2" style={{ maxWidth: '200px' }}>
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <PencilIcon className="w-4 h-4 inline-block" />
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4 flex py-3 items-center">
        <Fragment>
          <select
            id="itemsPerPage"
            className="border border-acc-color text-[13px] text-acc-color rounded-md px-1 py-[0.5px]"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <label htmlFor="itemsPerPage"  className='text-acc-color text-[13px] ml-2'>
            Items per page
          </label>
        </Fragment>
        <div className='ml-2 text-[13px] text-title-color'>
          {`${startIndex + 1}-${Math.min(endIndex, sortedData.length)} of ${sortedData.length} items`}
        </div>
      </div>
    </div>
  );
}