"use client";

import { useTranslations } from "next-intl";
import BookAppointmentContainer from "./__components/BookAppointmentCalender";

type Props = {};

const Page = (props: Props) => {
  const t = useTranslations("BookAppointment");

  return (
    <div className=" flex flex-col p-4 md:p-0 gap-4 pb-32 md:pb-4 overflow-auto py-24 md:py-4 min-h-screen sm:min-h-full">
      <h1 className="text-lg font-bold bg-white p-4 rounded-xl">
        {t("heading")}
      </h1>
      <div>
        <BookAppointmentContainer />
      </div>
    </div>
  );
};

export default Page;
