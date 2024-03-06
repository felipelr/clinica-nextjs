import { CalendarHelper } from "@/common/helpers/calendarHelper/calendarHelper"
import React from "react"
import { DayProps } from "./calendar"

type CalendarMonthProps = {
    currentDate: Date
    days: DayProps[]
}

export default function CalendarMonth({ currentDate, days }: CalendarMonthProps) {
    const dateTimeFormat = CalendarHelper.getDateTimeFormat('en-US')
    const timeFormat = CalendarHelper.getTimeFormat()
    const today = CalendarHelper.getToday()

    return (

        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
            <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                <div className="flex justify-center bg-white py-2">
                    <span>D</span>
                    <span className="sr-only sm:not-sr-only">om</span>
                </div>
                <div className="flex justify-center bg-white py-2">
                    <span>S</span>
                    <span className="sr-only sm:not-sr-only">eg</span>
                </div>
                <div className="flex justify-center bg-white py-2">
                    <span>T</span>
                    <span className="sr-only sm:not-sr-only">er</span>
                </div>
                <div className="flex justify-center bg-white py-2">
                    <span>Q</span>
                    <span className="sr-only sm:not-sr-only">ua</span>
                </div>
                <div className="flex justify-center bg-white py-2">
                    <span>Q</span>
                    <span className="sr-only sm:not-sr-only">ui</span>
                </div>
                <div className="flex justify-center bg-white py-2">
                    <span>S</span>
                    <span className="sr-only sm:not-sr-only">ex</span>
                </div>
                <div className="flex justify-center bg-white py-2">
                    <span>S</span>
                    <span className="sr-only sm:not-sr-only">áb</span>
                </div>
            </div>
            <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                    {/**
                        Always include: "relative py-2 px-3"
                        Is current month, include: "bg-white"
                        Is not current month, include: "bg-gray-50 text-gray-500"
                    */}
                    {/**
                        Time TAG
                        Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 font-semibold text-white"
                    */}
                    {days.map(({ date, events }) => {
                        const isTodayClass = date.getTime() === today.getTime() ? 'flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 font-semibold text-white' : ''
                        const isCurrentMonthClass = date.getMonth() === currentDate.getMonth() ? 'bg-white' : 'bg-gray-50 text-gray-500'
                        return (
                            <div key={date.getTime()} className={`relative px-3 py-2 ${isCurrentMonthClass}`}>
                                <time className={isTodayClass} dateTime={CalendarHelper.formatEnUS(dateTimeFormat, date)}>{date.getDate()}</time>
                                {events && (
                                    <ol className="mt-2">
                                        {events?.map(ev => (
                                            <li key={ev.date.getTime()}>
                                                <a href="#" className="group flex">
                                                    <p className="flex-auto truncate font-medium text-violet-500 group-hover:text-violet-800">
                                                        {ev.title}
                                                    </p>
                                                    <time dateTime={CalendarHelper.formatUTC(dateTimeFormat, ev.date)} className="ml-3 hidden flex-none text-violet-500 group-hover:text-violet-800 xl:block">
                                                        {timeFormat.format(ev.date)}
                                                    </time>
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </div>
                        )
                    })}

                </div>
                <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                    {/**
                        Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                        Is current month, include: "bg-white"
                        Is not current month, include: "bg-gray-50"
                        Is selected or is today, include: "font-semibold"
                        Is selected, include: "text-white"
                        Is not selected and is today, include: "text-violet-600"
                        Is not selected and is current month, and is not today, include: "text-gray-900"
                        Is not selected, is not current month, and is not today: "text-gray-500"
                    */}
                    {/** 
                        Time TAG
                        Always include: "ml-auto"
                        Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
                        Is selected and is today, include: "bg-violet-600"
                        Is selected and is not today, include: "bg-gray-900"
                    */}
                    {days.map(({ date, events }) => {
                        const isSelected = date.getTime() === currentDate.getTime()
                        let itemClass = date.getMonth() === currentDate.getMonth() ? 'bg-white' : 'bg-gray-50'
                        let timeClass = ''

                        if (isSelected) {
                            itemClass += ' text-white font-semibold'
                            timeClass += ' flex h-6 w-6 items-center justify-center rounded-full'
                            timeClass += date.getTime() === today.getTime() ? ' bg-violet-600' : ' bg-gray-900'
                        }
                        else {
                            itemClass += date.getTime() === today.getTime() ? ' font-semibold text-violet-600' : ''
                            itemClass += date.getMonth() === currentDate.getMonth() && date.getTime() !== today.getTime() ? ' text-gray-900' : ''
                            itemClass += date.getMonth() !== currentDate.getMonth() && date.getTime() !== today.getTime() ? ' text-gray-500' : ''
                        }

                        return (
                            <button key={`${date.getTime()}-mobile`} type="button" className={`flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10 ${itemClass}`}>
                                <time dateTime={CalendarHelper.formatEnUS(dateTimeFormat, date)} className={`ml-auto ${timeClass}`}>{date.getDate()}</time>
                                <span className="sr-only">{events?.length || 0} events</span>
                                {events && (
                                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                        {events?.map(ev => (
                                            <span key={`${ev.date.getTime()}-mobile`} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                                        ))}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}