import { defaultLocale } from "@/i18n";
import { redirect } from "next/navigation";

const RootPage = () => {
  return redirect(`/${defaultLocale}`);
};

export default RootPage;
