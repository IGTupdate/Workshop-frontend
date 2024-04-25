"use client";

import Loader from "@/app/components/Loader";
import { getAllAppointment } from "@/app/services/operations/appointment/appointment";
import { TAppointment } from "@/app/types/appointment";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { APPOINTMENT_DATA_PAGE_SIZE } from "../__utils/constant";
import AppointmentTableContainer from "./AppointmentTableContainer";

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
    loadAppointement();
  }, [searchParams, router]);

  const loadAppointement = async () => {
    setAppointmentDataLoading(true);
    const appointmentData = await getAllAppointment(searchParams.toString());
    if (appointmentData) {
      setAppointmentData(appointmentData);
    }
    setAppointmentDataLoading(false);
  };

  // create query string
  const createQueryString = useCallback(
    (name: string, value?: string) => {
      if (!value || value === "")
        return removeQueryParams(searchParams.toString(), name);
      else return setQueryParams(searchParams.toString(), name, value);
    },
    [searchParams]
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

  return (
    <div>
      {appointmentDataLoading ? (
        <Loader />
      ) : (
        <div>
          <AppointmentTableContainer
            appointmentData={appointmentData.appointments}
          />
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
