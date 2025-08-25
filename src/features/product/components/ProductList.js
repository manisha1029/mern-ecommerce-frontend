import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllProducts, fetchProductsByFilterAsync } from '../productSlice';
import { filters, sortOptions } from '../../../assets/data/productFilter';
import { LIMIT_PER_PAGE } from '../../../app/constants';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductList() {
  // State variables
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  // Redux
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  // Effect:Fetch all products on component mount.
  useEffect(() => {
    const pagination = { _page: page, _limit: LIMIT_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
  }, [filter, sort, page, dispatch]);

  /** Function responsible for handling filter changes */
  function handleFilterChange(e, sectionId, optionVal) {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[sectionId]) {
        newFilter[sectionId].push(optionVal);
      } else {
        newFilter[sectionId] = [optionVal];
      }
    } else {
      const index = newFilter[sectionId]?.findIndex(item => item === optionVal);
      if (index !== -1) {
        newFilter[sectionId].splice(index, 1);
      }
      if (newFilter[sectionId].length === 0) {
        delete newFilter[sectionId];
      }
    }
    setFilter(newFilter);
    dispatch(fetchProductsByFilterAsync({ filter: newFilter, sort, page }));
  }

  /** Function responsible for handling sort changes */
  function handleSortChange(option) {
    const newSort = { ...sort, _sort: option.sort, _order: option.order };
    setSort(newSort);
    dispatch(fetchProductsByFilterAsync({ filter, sort: newSort, page }));
  }

  function handlePageChange(page) {
    setPage(page);
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilterChange={handleFilterChange}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className="group inline-flex justify-center 
                  text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-40 
                   first-letter:origin-top-right rounded-md bg-white shadow-2xl ring-1
                   ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      {sortOptions.map(option => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => handleSortChange(option)}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter handleFilterChange={handleFilterChange} />
              <ProductGrid products={products} />
            </div>
          </section>

          <Pagination page={page} handlePageChange={handlePageChange} />
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilterChange,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              {filters.map(section => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={e =>
                                  handleFilterChange(
                                    e,
                                    section.id,
                                    option.value
                                  )
                                }
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilterChange }) {
  return (
    <form className="hidden lg:block">
      {filters.map(section => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button
                  className="flex w-full items-center justify-between
                 bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                >
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={e =>
                          handleFilterChange(e, section.id, option.value)
                        }
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function Pagination({ page, handlePageChange, totalProducts = 55 }) {
  const totalPages = Math.ceil(totalProducts / LIMIT_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          className="relative inline-flex 
          items-center rounded-md border
           border-gray-300 bg-white px-4 py-2 text-sm 
           font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
        >
          Previous
        </div>
        <div
          className="relative ml-3 inline-flex 
          items-center rounded-md border border-gray-300 
          bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handlePageChange(totalPages > page ? page + 1 : page)}
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(page - 1) * LIMIT_PER_PAGE + 1}
            </span>{' '}
            to <span className="font-medium">{page * LIMIT_PER_PAGE}</span> of{' '}
            <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              className="relative inline-flex items-center 
              rounded-l-md px-2 py-2 text-gray-400 ring-1 
              ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                onClick={() => handlePageChange(index + 1)}
                aria-current={page === index + 1 ? 'page' : null}
                className={` cursor-pointer relative z-10 inline-flex items-center justify-center px-4 py-2 
                  text-sm font-medium transition-all duration-200 ease-in-out
                  border border-gray-300 rounded-md min-w-[40px] h-[40px]
                  focus:z-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  hover:shadow-md hover:scale-105
                  ${
                    page === index + 1
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                      : 'text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400'
                  }`}
              >
                {index + 1}
              </div>
            ))}
            <div
              className="relative inline-flex items-center 
              rounded-r-md px-2 py-2 text-gray-400 ring-1 
              ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() =>
                handlePageChange(totalPages > page ? page + 1 : page)
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      {/* This is our products list  */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map(product => (
              <Link
                key={product.id}
                to={`/product-detail/${product.id}`}
                className="group relative border-solid border-2 border-gray-200 rounded-md p-2 block"
              >
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      {product.rating}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm font-medium text-gray-500 line-through">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
