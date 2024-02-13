import { scheduleService } from "@/prisma/services/schedule-service";

type ScheduleDetailPageProps = {
    params: { slug: string };
}

async function getScheduleById(id: string) {
    try {
        return await scheduleService.getById(id)
    } catch (err) {
        console.error(err)
        return null
    }
}

export default async function ScheduleDetailPage({ params }: ScheduleDetailPageProps) {
    const slug = decodeURIComponent(params.slug);
    const schedule = await getScheduleById(slug)
    return (
        <div className="">
            <h4 className="text-2xl font-bold text-violet-500 dark:text-white mb-4">
                Agenda #{schedule?.id}
            </h4>
            <pre>
                {JSON.stringify(schedule, null, 2)}
            </pre>
        </div>
    )
}