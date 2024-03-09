import SearchIcon from "@/components/ui/icons/search-icon"
import Paginate from "@/components/ui/paginate/paginate"
import { scheduleService } from "@/prisma/factories/schedule-service-factory"
import { MetaProps, ParamsProps } from "@/prisma/services/interfaces/service-interface"
import { Schedule } from '@/prisma/services/types/Schedule'
import Link from "next/link"

type SchedulesPageProps = {
    searchParams: ParamsProps
}

async function getSchedules(params?: ParamsProps): Promise<{ data: Schedule[], meta: MetaProps } | null> {
    try {
        return await scheduleService.getAll(params)
    }
    catch (err) {
        console.error(err)
        return null
    }
}

export default async function SchedulesPage({ searchParams }: SchedulesPageProps) {
    const schedules = await getSchedules(searchParams)

    return (
        <div className="">
            <h4 className="text-2xl font-bold text-violet-500 dark:text-white mb-4">Agendas</h4>

            <div className="pb-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Pesquisar por nome
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        id="table-search"
                        type="text"
                        placeholder="Pesquisar por nome"
                        className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500" />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3" style={{ width: 50 }}>
                                <span className="sr-only"></span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Agenda
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Profissional
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules?.data?.map(item =>
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/schedules/${item.id}`} className="hover:underline">
                                        <SearchIcon />
                                    </Link>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    {item.professional.name}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Paginate {...schedules?.meta} />
        </div>
    )
}
