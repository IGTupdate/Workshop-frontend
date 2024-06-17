import { cookies } from "next/headers";

export const get_server_cookie = (name: string): string | undefined => {
  return cookies().get(name)?.value;
};
