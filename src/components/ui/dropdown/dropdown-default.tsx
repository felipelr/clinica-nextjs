'use client'

import React, { useState } from "react";
import ArrowDownIcon from "../icons/arrow-down-icon";

interface DropdownDefaultProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    dropdownType?: 'button' | 'span'
    label: string
    sections: {
        id: string
        items: {
            id: string
            label: string
            href?: string
            onClick?: React.AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
        }[]
    }[]
    icon?: React.ReactNode
}

export default function DropdownDefault({ dropdownType = 'button', icon, className, sections, label, onClick, ...props }: DropdownDefaultProps) {
    const [show, setShow] = useState(false)

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setShow(prev => !prev)

        if (onClick)
            onClick(ev)
    }

    return (
        <div className={`relative ${className}`}>
            <button
                className={`${dropdownType === 'button' ? 'flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' : '-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500'}`}
                onClick={handleClick} {...props} type="button" id="menu-button" aria-expanded="false" aria-haspopup="true">
                {label}
                {icon ? icon : <ArrowDownIcon className="-mr-1 h-5 w-5" />}
            </button>

            {/**
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            */}
            <div className={`${show ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95'} absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100  overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}>
                {sections?.map(({ id, items }) => (
                    <div key={id} className="py-1" role="none">
                        {/** Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                        {items.map(item => (
                            <a key={item.id} id={item.id} onClick={item.onClick} href={item.href} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} >
                                {item.label}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}