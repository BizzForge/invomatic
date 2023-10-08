import { BarsArrowDownIcon, BarsArrowUpIcon, CalendarDaysIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useEffect, useState } from 'react';
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

  const mobileBreakpoint = 768;
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < mobileBreakpoint);
      const handleResize = () => {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

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
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(fieldName);
      setSortDirection('asc');
    }
  };

  const sortedData = [...jsonData.data];

  if (sortField) {
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
    setCurrentPage(1);
  };

  return (
    <div className="relative mt-4">
      {isMobile ? (
        <Fragment>

        <div class="block md:flex justify-between pb-4 items-center">
          <div className="md:pb-3"> 
            <h5 className='mb-2 text-lg mdtext-2xl font-bold tracking-tight text-acc-color'>{title}</h5>
          </div>
          <div className="flex table-left">
            <div className='mr-3'>
              <InputWithIcon type="text" value={searchQuery} change={(e) => setSearchQuery(e.target.value)} LeftIcon={<MagnifyingGlassIcon className="h-5 w-5 text-primary" />} placeholder="Search" />
            </div>
            {/* <DatePicker Icon={CalendarDaysIcon} title={"Select Date"} color="acc-color"/> */}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {data
          .filter((item) =>
            Object.values(item)
              .join(' ')
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((item, index) => (
            <div
            key={item.id}
            className="border border-acc-color-2 rounded-md p-4 md:p-2"
            >
              <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                          <p class="text-sm text-acc-color truncate dark:text-gray-400">
                            Product Code
                          </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-acc-color ">
                          {item.productCode}
                      </div>
                    </div>
                </li>
                <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                          <p class="text-sm text-acc-color truncate dark:text-gray-400">
                            Product Name
                          </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-acc-color ">
                          {item.productName}
                      </div>
                    </div>
                </li>
                <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                          <p class="text-sm text-acc-color truncate dark:text-gray-400">
                            Category
                          </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-acc-color ">
                          {item.category}
                      </div>
                    </div>
                </li>
                <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                          <p class="text-sm text-acc-color truncate dark:text-gray-400">
                            Quantity
                          </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-acc-color ">
                          {item.quantity}
                      </div>
                    </div>
                </li>
                <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                          <p class="text-sm text-acc-color truncate dark:text-gray-400">
                            Price
                          </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-acc-color ">
                          {item.price}
                      </div>
                    </div>
                </li>
                <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                          <p class="text-sm text-acc-color truncate dark:text-gray-400">
                            Added Date
                          </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-acc-color ">
                          {item.addedDate}
                      </div>
                    </div>
                </li>
                <li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-1 min-w-0">
                          <p class="text-sm text-acc-color truncate dark:text-gray-400">
                            Expiary Date
                          </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-acc-color ">
                          {item.expiaryDate}
                      </div>
                    </div>
                </li>
              </ul>
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <PencilIcon className="w-4 h-4 inline-block" />
              </a>
            </div>
          ))}
        </div>
          </Fragment>
      ) : (
        <div className="overflow-x-auto">
          <div class="block md:flex justify-between pb-4 items-center">
            <div className="md:pb-3"> 
              <h5 className='mb-2 text-lg mdtext-2xl font-bold tracking-tight text-acc-color'>{title}</h5>
            </div>
            <div className="flex table-left">
              <div className='mr-3'>
                <InputWithIcon type="text" value={searchQuery} change={(e) => setSearchQuery(e.target.value)} LeftIcon={<MagnifyingGlassIcon className="h-5 w-5 text-primary" />} placeholder="Search" />
              </div>
              {/* <DatePicker Icon={CalendarDaysIcon} title={"Select Date"} color="acc-color"/> */}
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
                  <th
                    key={index}
                    scope="col"
                    className="px-6 text-[14px] py-3 cursor-pointer"
                    onClick={() => handleSort(title)}
                    style={{ maxWidth: '200px', whiteSpace: 'nowrap' }} // Add this style
                  >
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
      )}
    </div>
  );
}