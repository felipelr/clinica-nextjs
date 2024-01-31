export interface ICookieHelper {
    get(key: string): string | undefined
    set(key: string, value: string) : void
}
