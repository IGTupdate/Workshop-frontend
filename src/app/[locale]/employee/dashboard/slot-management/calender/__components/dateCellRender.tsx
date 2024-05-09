import { TCalender } from "@/app/types/calender";
import { get_date_only, isPastDate } from "@/app/utils/helper";
import type { Dayjs } from "dayjs";
import { MdBlockFlipped } from "react-icons/md";
import { calender_status } from "../__utils/constant";
import { calenderCellBgColorByStatus } from "../__utils/constant";
import { getAllSlotOfCalender } from "../__utils/helper";
import { CgCloseO } from "react-icons/cg";

const getRequiredCalenderByDate = (
  calenderData: TCalender[],
  value: Dayjs,
): TCalender | null => {
  const required_calender = calenderData.find((calender) => {
    return (
      get_date_only(new Date(value.toISOString())).toISOString() ===
      calender.date
    );
  });

  if (!required_calender) {
    return null;
  }
  return required_calender;
};

type TdateCellRender = {
  calenderData: TCalender[];
  current: Dayjs;
  activeCalender: Partial<TCalender> | null;
  handleCalenderCellButtonClick: (data: Partial<TCalender> | null) => void;
};

const dateCellRender = (params: TdateCellRender) => {
  const {
    calenderData,
    current: value,
    activeCalender,
    handleCalenderCellButtonClick,
  } = params;

  // required calender
  const required_calender = getRequiredCalenderByDate(calenderData, value);

  // on click if calender already exist then open manage drawer for the calender else open new calender form
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (required_calender) {
      handleCalenderCellButtonClick(required_calender);
    } else {
      const new_calender: Partial<TCalender> = {
        date: get_date_only(new Date(value.toISOString())).toISOString(),
      };
      handleCalenderCellButtonClick(new_calender);
    }
  };

  // date is past then no action
  if (isPastDate(new Date(value.toISOString())) && !required_calender) {
    return (
      <div
        className={`group w-full h-full ${calenderCellBgColorByStatus["Default"]} flex flex-col items-center justify-center relative overflow-hidden h-full w-full bg-[#CDCDCE]`}
      >
        <MdBlockFlipped size={25} className="text-white" />
        <p className="text-md font-normal text-center text-white">Not Opened</p>
      </div>
    );
  }

  // for new calender or existing calender
  return (
    <div
      className={`group w-full h-full ${
        calenderCellBgColorByStatus[
          (required_calender && required_calender.status) || "Default"
        ]
      } flex items-center justify-center relative overflow-hidden`}
    >
      <div className="flex flex-col justify-center items-center bg-[#aef2c0] w-full h-full">
        {required_calender?.status === calender_status.open && (
          <div className="flex flex-col justify-center items-center bg-[#fffaeb] w-full h-full">
            <h2 className="text-xl font-semibold text-center">
              {getAllSlotOfCalender(required_calender)}
            </h2>
            <p className="text-md font-normal text-center">Slots Open</p>
          </div>
        )}
        {required_calender?.status === calender_status.close && (
          <div className="flex flex-col justify-center items-center bg-[#eba78a] w-full h-full">
            <CgCloseO size={25} className="text-white" />
            <p className="text-md font-normal text-center text-white">Closed</p>
          </div>
        )}
      </div>
      <button
        onClick={handleClick}
        className="absolute -bottom-20 group-hover:bottom-0 transition-all ease-in-out duration-200 w-full py-2 bg-black1 text-white1"
      >
        {required_calender ? "View" : "Schedule"}
      </button>
    </div>
  );
};

export default dateCellRender;
