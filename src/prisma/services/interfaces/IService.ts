export type ParamsProps = Record<string, string>
export type MetaProps = { currentPage: number, pageSize: number, totalRecords: number, from: number, to: number }
export interface IService<T> {
    getById: (id: string) => Promise<T | null>
    getAll: (params?: ParamsProps) => Promise<T[] | { data: T[], meta: MetaProps } | null>
}