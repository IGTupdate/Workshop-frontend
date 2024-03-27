import type { Dayjs } from "dayjs";

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const monthCellRender = (value: Dayjs) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      {" "}
      <section>{num}</section> <span>Backlog number</span>{" "}
    </div>
  ) : null;
};

export default monthCellRender;
