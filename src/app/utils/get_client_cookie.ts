import { getCookie } from "cookies-next"

export const get_client_cookie = (name: string): string | undefined => {
    const value = getCookie(name) as string || undefined
    return value;
}