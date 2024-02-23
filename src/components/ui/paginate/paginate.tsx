import React from 'react'

type PaginateProps = {
    currentPage?: number,
    pageSize?: number,
    totalRecords?: number,
    from?: number,
    to?: number
}

export default function Paginate({
    currentPage = 0,
    pageSize = 0,
    totalRecords = 0,
    from = 0,
    to = 0,
}: PaginateProps) {
    const totalPages = totalRecords === 0 ? 0 : totalRecords <= pageSize ? 1 : Math.floor(totalRecords / pageSize)
    const normalPageClass = 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
    const activePageClass = 'flex items-center justify-center px-3 h-8 text-violet-600 border border-gray-300 bg-violet-50 hover:bg-violet-100 hover:text-violet-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'

    if (totalPages <= 5) {
        return (
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Mostrando <span className="font-semibold text-gray-900 dark:text-white">{from} - {to}</span> de <span className="font-semibold text-gray-900 dark:text-white">{totalRecords}</span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => {
                        return (
                            <li key={`page-${index + 1}`}>
                                <a href="#" className={(index + 1) === currentPage ? activePageClass : normalPageClass}>
                                    {index + 1}
                                </a>
                            </li>
                        )
                    })}
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        )
    }

    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{from} - {to}</span> de <span className="font-semibold text-gray-900 dark:text-white">{totalRecords}</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                {Array.from({ length: 5 }).map((_, index) => {
                    return (
                        <li>
                            <a href="#" className={(index + 1) === currentPage ? activePageClass : normalPageClass}>
                                {index + 1}
                            </a>
                        </li>
                    )
                })}
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            </ul>
        </nav>
    )
}