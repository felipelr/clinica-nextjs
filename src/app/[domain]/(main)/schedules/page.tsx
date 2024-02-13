import SearchIcon from "@/components/ui/icons/search-icon"
import { scheduleService } from "@/prisma/services/schedule-service"
import Link from "next/link"

async function getSchedules() {
    try {
        return await scheduleService.getAll()
    }
    catch (err) {
        console.error(err)
        return []
    }
}

export default async function SchedulesPage() {
    const schedules = await getSchedules()
    return (
        <div className="">
            <h4 className="text-2xl font-bold text-violet-500 dark:text-white mb-4">Agendas</h4>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                        {schedules?.map(item =>
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
        </div>
    )
}
