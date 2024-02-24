import React from 'react'

type PaginateProps = {
    currentPage?: number,
    pageSize?: number,
    totalRecords?: number,
    from?: number,
    to?: number
}

export default function Paginate({
    currentPage = 1,
    pageSize = 0,
    totalRecords = 0,
    from = 0,
    to = 0,
}: PaginateProps) {
    const totalPages = totalRecords === 0 ? 0 : totalRecords <= pageSize ? 1 : (totalRecords % pageSize === 0) ? (totalRecords / pageSize) : (Math.floor(totalRecords / pageSize) + 1)
    const normalPageClass = 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
    const activePageClass = 'flex items-center justify-center px-3 h-8 text-violet-600 border border-gray-300 bg-violet-50 hover:bg-violet-100 hover:text-violet-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'

    if (totalPages <= 6) {
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
                        const page = index + 1
                        return (
                            <li key={`page-${page}`}>
                                <a href="#" className={page === currentPage ? activePageClass : normalPageClass}>
                                    {page}
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

    let page = 0
    const pattern = currentPage < 5 ? '99999#9' : currentPage > totalPages - 4 ? '9#99999' : '9#999#9'
    const pages = pattern.split('')
    const pagination = pages.map((cp, index) => {
        const lastPrinted = pages[index - 1]
        const isLastPage = index + 1 === pages.length

        if (cp === '#') {
            return (
                <li key={`page-${index}`}>
                    <a href="#" className={normalPageClass}>
                        ...
                    </a>
                </li>
            )
        }

        if (isLastPage) {
            return (
                <li key={`page-${index}`}>
                    <a href="#" className={totalPages === currentPage ? activePageClass : normalPageClass}>
                        {totalPages}
                    </a>
                </li>
            )
        }

        if (pattern === '99999#9') {
            page = lastPrinted === '#' ? totalPages : page + 1
        } else if (pattern === '9#99999') {
            page = lastPrinted === '#' ? totalPages - 4 : page + 1
        } else {
            page = lastPrinted === '#' ? currentPage - 1 : page + 1
        }

        return (
            <li key={`page-${index}`}>
                <a href="#" className={page === currentPage ? activePageClass : normalPageClass}>
                    {page}
                </a>
            </li>
        )
    })

    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{from} - {to}</span> de <span className="font-semibold text-gray-900 dark:text-white">{totalRecords}</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                {pagination}
                <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            </ul>
        </nav>
    )
}