'use client'

import React, { useState } from "react"
import CalendarMonth from "./calendar-month"
import { CalendarHelper } from "@/common/helpers/calendarHelper/calendarHelper"
import DropdownDefault from "../dropdown/dropdown-default"
import EllipsesIcon from "../icons/ellipses-icon"

export type DayProps = {
    date: Date
    events?: {
        date: Date
        title: string
    }[]
}

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(CalendarHelper.getToday())

    const firstDayCalendar = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    firstDayCalendar.setDate(firstDayCalendar.getDate() - firstDayCalendar.getDay())

    const lastDayOfCalendar = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    lastDayOfCalendar.setDate(lastDayOfCalendar.getDate() - 1)
    lastDayOfCalendar.setDate(lastDayOfCalendar.getDate() + (6 - lastDayOfCalendar.getDay()))

    const days: DayProps[] = []
    while (firstDayCalendar.getTime() <= lastDayOfCalendar.getTime()) {
        days.push({
            date: new Date(firstDayCalendar.getTime()),
            events: firstDayCalendar.getDate() === 10 ? [{
                date: new Date(firstDayCalendar.getFullYear(), firstDayCalendar.getMonth() + 1, firstDayCalendar.getDate(), 10),
                title: 'Date night'
            }] : []
        })
        firstDayCalendar.setDate(firstDayCalendar.getDate() + 1)
    }

    const handleNextDay = () => {
        setCurrentDate(prev => {
            const date = new Date(prev.getFullYear(), prev.getMonth(), prev.getDate())
            date.setDate(date.getDate() + 1)
            return date
        })
    }

    const handlePreviousDay = () => {
        setCurrentDate(prev => {
            const date = new Date(prev.getFullYear(), prev.getMonth(), prev.getDate())
            date.setDate(date.getDate() - 1)
            return date
        })
    }

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <time dateTime="2022-01">{CalendarHelper.MONTH[currentDate.getMonth()]} {currentDate.getFullYear()}</time>
                </h1>
                <div className="flex items-center">
                    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                        <button onClick={handlePreviousDay} type="button" className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                            <span className="sr-only">Anterior</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button type="button" className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Hoje</button>
                        <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
                        <button onClick={handleNextDay} type="button" className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                            <span className="sr-only">Próximo</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:ml-4 md:flex md:items-center">
                        <DropdownDefault
                            label="Mensal"
                            sections={[
                                {
                                    id: 'type', items: [
                                        { onClick: () => alert('test'), label: 'Diário', id: 'item-daily' },
                                        { href: '#', label: 'Semanal', id: 'item-week' },
                                        { href: '#', label: 'Mensal', id: 'item-month' },
                                    ]
                                }
                            ]} />
                        <div className="ml-6 h-6 w-px bg-gray-300"></div>
                        <button type="button" className="ml-6 rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500">
                            Adicionar Evento
                        </button>
                    </div>
                    <DropdownDefault
                        dropdownType='span'
                        className="ml-6 md:hidden"
                        label=""
                        icon={<EllipsesIcon />}
                        sections={[
                            {
                                id: 'section-create-event', items: [
                                    { href: '', label: 'Adicionar Evento', id: 'item-create-event' }
                                ]
                            },
                            {
                                id: 'section-today', items: [
                                    { href: '', label: 'Ir para hoje', id: 'item-today' }
                                ]
                            },
                            {
                                id: 'type', items: [
                                    { href: '#', label: 'Diário', id: 'item-daily' },
                                    { href: '#', label: 'Semanal', id: 'item-week' },
                                    { href: '#', label: 'Mensal', id: 'item-month' },
                                ]
                            }
                        ]} />
                </div>
            </header>
            <CalendarMonth currentDate={currentDate} days={days} />
        </div>
    )
}