export type ParamsProps = Record<string, string>
export interface IService<T> {
    getById: (id: string) => Promise<T | null>
    getAll: (params?: ParamsProps) => Promise<T[] | null>
}