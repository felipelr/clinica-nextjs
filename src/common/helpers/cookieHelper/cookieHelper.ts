import { ICookieHelper } from "./cookieHelperInterface";
import { cookies } from 'next/headers'

export class CookieHelper implements ICookieHelper {
    get (key: string) {
        const value = cookies().get(key)?.value
        return value ? atob(value) : value
    }

    set(key: string, value: string) {
        cookies().set(key, btoa(value))
    }
}