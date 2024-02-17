'use client'

import { useState } from "react"
import { useDetectClickOutside } from "@/common/hooks/useDetectClickOutside"
import './sidebar.css'
import Link from "next/link"
import DashboardIcon from "@/components/ui/icons/dashboard-icon"
import ScheduleIcon from "@/components/ui/icons/schedule-icon"
import RegistrationIcon from "@/components/ui/icons/registration-icon"
import ArrowDownIcon from "../icons/arrow-down-icon"

export default function Sidebar() {
    const [open, setOpen] = useState(false)
    const ref = useDetectClickOutside({
        onTriggered: () => {
            setOpen(false)
        }
    })

    const closeToggle = () => {
        setOpen(prev => !prev)
    }

    return (
        <div ref={ref}>
            <button onClick={closeToggle} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-violet-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${open ? '' : '-translate-x-full'} sm:translate-x-0 shadow-lg shadow-gray-500/50 sm:shadow-none`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <img
                            src="https://fastly.picsum.photos/id/282/220/60.jpg?hmac=GWIxV3mvFU-mmUdEjzQPlWz5heg1tfod1cJH4qE3Yx0"
                            alt="Company Logo" />
                    </a>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <DashboardIcon />
                                <span className="ms-3">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/schedules"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <ScheduleIcon />
                                <span className="ms-3">
                                    Agendas
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="sidebar-dropdown flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <RegistrationIcon />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                    Cadastros
                                </span>
                                <ArrowDownIcon />
                            </button>
                            <ul id="dropdown-example" className="py-2 space-y-2">
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        Pacientes
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        Profissionais
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}