// import { cookies } from "next/headers"
// import { getCookie } from "cookies-next"

export const get_cookie = async (name: string) => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    return cookies().get(name)?.value;
  } else {
    const { getCookie } = await import("cookies-next");
    const value = (getCookie(name) as string) || undefined;
    return value;
  }
};
