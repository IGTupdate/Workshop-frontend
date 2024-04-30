"use client";

import Loader from "@/app/components/Loader";
import { getPageAppointment } from "@/app/services/operations/appointment/appointment";
import { TAppointment } from "@/app/types/appointment";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import { Button, DatePicker, Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { APPOINTMENT_DATA_PAGE_SIZE } from "../__utils/constant";
import AppointmentTableContainer from "./AppointmentTableContainer";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

type Props = {};
type TAppointmentData = {
  appointments: TAppointment[];
  totalAppointments: number;
};

const AppointmentpageContainer = (props: Props) => {
  const [appointmentDataLoading, setAppointmentDataLoading] =
    useState<boolean>(false);

  const [appointmentData, setAppointmentData] = useState<TAppointmentData>({
    appointments: [],
    totalAppointments: 0,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // when search params changes then call api
  useEffect(() => {
    loadAppointement(searchParams.toString());
  }, [searchParams, router]);

  const loadAppointement = async (querystring: string) => {
    setAppointmentDataLoading(true);
    const appointmentData = await getPageAppointment(querystring);
    if (appointmentData) {
      setAppointmentData(appointmentData);
    }
    setAppointmentDataLoading(false);
  };

  // create query string
  const createQueryString = useCallback(
    (name: string, value?: string, url: string = searchParams.toString()) => {
      if (!value || value === "")
        return removeQueryParams(url, name);
      else return setQueryParams(url, name, value);
    },
    [searchParams],
  );

  // get current page
  const getCurrentPage = useCallback(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  // handle page change
  const handlePageChange = (value: number) => {
    const queryParmas = createQueryString("page", String(value));
    router.push(`${pathname}?${queryParmas}`);
  };

  const handleClearFilter = () => {
    router.push(pathname);
  };

  const handleRangeSelect = (value: any) => {
    if (!value) return;
    // console.log(value);
    const startDate = value.length > 0 ? dayjs(value[0]).format('YYYY-MM-DDTHH:mm:ss.SSS') : new Date().toISOString()
    const endDate = value.length > 1 ? dayjs(value[1]).format('YYYY-MM-DDTHH:mm:ss.SSS') : new Date().toISOString();

    // console.log(startDate, endDate);

    let querystring = createQueryString("startDate", startDate);
    querystring = createQueryString("endDate", endDate, querystring);
    router.push(`${pathname}?${querystring}`);
  }

  return (
    <div>
      {appointmentDataLoading ? (
        <div style={{ height: 'calc(100vh - 300px)' }} className="flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between">
            {
              (searchParams.get("startDate") && searchParams.get("endDate")) ? <RangePicker
                onChange={handleRangeSelect}
                defaultValue={[dayjs(searchParams.get("startDate")), dayjs(searchParams.get("endDate"))]}
              />
                : <RangePicker
                  onChange={handleRangeSelect}
                />
            }
            <div>
              <Button type="link" onClick={handleClearFilter}>
                Clear Filter
              </Button>
            </div>
          </div>
          <div className="shadow-xl overflow-hidden rounded-xl">
            <AppointmentTableContainer
              appointmentData={appointmentData.appointments}
            />
          </div>
          <div className="mt-10 mx-auto w-max">
            <Pagination
              defaultCurrent={getCurrentPage()}
              pageSize={APPOINTMENT_DATA_PAGE_SIZE}
              total={appointmentData.totalAppointments}
              onChange={(value) => handlePageChange(value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentpageContainer;
