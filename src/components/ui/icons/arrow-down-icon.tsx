import React from 'react'
import BaseIcon, { BaseIconProps } from './base-icon'

export default function ArrowDownIcon(props: BaseIconProps) {
    return (
        <BaseIcon {...props}>
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
        </BaseIcon>
    )
}