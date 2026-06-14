import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfProperties: number,
    propertyImage?: string,
    location?: string
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
