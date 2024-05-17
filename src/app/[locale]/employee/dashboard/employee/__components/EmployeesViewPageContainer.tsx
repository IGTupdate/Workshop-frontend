"use client";

import Loader from "@/app/components/Loader";
import { getAllEmployees } from "@/app/services/operations/auth/employeeAuth";
import { TEmployee, TEmployeeTableDataType } from "@/app/types/employee";
import { useEffect, useState } from "react";
import EmployeeTableContainer from "./EmployeeTableContainer";

type Props = {};

const EmployeesViewPageContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<TEmployeeTableDataType[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = (await getAllEmployees()) as TEmployee[];

        return setEmployees(() => {
          return response.map((el) => {
            let role =
              typeof el.roleId === "object" ? el.roleId.role : el.roleId;

            return {
              key: el._id,
              fullName: `${el.firstName} ${el.lastName}`,
              _id: el._id,
              status: el.status || "",
              email: el.email,
              role: role.split("_").join(" "),
              contactNumber: el.contactNumber || "",
            };
          });
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{ height: "calc(100vh - 300px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div>
          <EmployeeTableContainer employees={employees} />
        </div>
      )}
    </div>
  );
};

export default EmployeesViewPageContainer;
