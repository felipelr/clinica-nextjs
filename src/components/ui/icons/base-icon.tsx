import React from 'react'

export interface BaseIconProps extends React.SVGProps<SVGAElement> {

}

export default function BaseIcon({ className, width = '24', height = '24', children, ...props }: BaseIconProps) {
    return (
        <svg
            fill="currentColor"
            className={`${className ? className + ' ' : ''}text-violet-500 transition duration-75 dark:text-gray-400 group-hover:text-violet-900 dark:group-hover:text-white`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height={height}
            width={width}>
            {children}
        </svg>
    )
}