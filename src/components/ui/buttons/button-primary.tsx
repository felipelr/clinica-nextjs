import React from "react";

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function ButtonPrimary({ className, ...props }: ButtonPrimaryProps) {
    return (
        <button
            className={`${className ? className + ' ' : ''}px-5 py-3 text-base font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 sm:w-auto dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800`}
            {...props} />
    )
}