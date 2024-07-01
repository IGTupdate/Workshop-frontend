import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["sp", "en"];
export const defaultLocale = locales[0];

export default getRequestConfig(async ({ locale }) => {
  // If the requested locale is not available, fallback to default locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
