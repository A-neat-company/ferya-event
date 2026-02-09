import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  let locale: Locale = defaultLocale;

  // 1. Check cookie
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale;
  } else {
    // 2. Check Accept-Language header
    const acceptLang = headerStore.get("accept-language") ?? "";
    const preferred = acceptLang
      .split(",")
      .map((part) => part.split(";")[0].trim().substring(0, 2).toLowerCase());
    const match = preferred.find((lang) =>
      locales.includes(lang as Locale)
    ) as Locale | undefined;
    if (match) {
      locale = match;
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
