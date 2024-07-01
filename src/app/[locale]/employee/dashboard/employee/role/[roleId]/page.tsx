"use client";
import {
  getAccess,
  getAccessByRoleId,
} from "@/app/services/operations/auth/customerAuth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShowAllRoles from "../__component/ShowAllRoles";
import Watermark from "@/app/components/Text/WatermarkText";
import Loader from "@/app/components/Loader";
import { Input } from "antd";

type Access = {
  action: string;
  fields: string[];
  role: string;
  _id: string;
  resource: string;
  accessProvided: boolean;
};

interface ActionItem {
  _id: string;
  action: string;
  fields: any[];
  role: string;
  accessProvided: boolean;
}

interface GroupedData {
  resource: string;
  actions: ActionItem[];
}

const Page = () => {
  const [actiopnName, setActionName] = useState("");
  const [action, setAction] = useState<Access[]>([]);
  const [access, setAccess] = useState<GroupedData[]>([]);
  const [filterData, setFilterData] = useState<GroupedData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getAllAccessByRoleId();
  }, [params.roleId]);

  const getAllAccessByRoleId = async () => {
    setLoading(true);
    try {
      const query = `/${params.roleId}`;
      const result = await getAccessByRoleId(query);
      if (result.success === true) {
        setAction(result.data.accessProvided);
        setActionName(result.data.role);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (action) {
      const uniqueActionsPerResource = (data: Access[]): GroupedData[] => {
        const resourceMap: { [key: string]: { [key: string]: ActionItem } } =
          {};

        action?.forEach((item) => {
          if (!resourceMap[item.resource]) {
            resourceMap[item.resource] = {};
          }

          if (!resourceMap[item.resource][item.action]) {
            resourceMap[item.resource][item.action] = item;
          }
        });

        return Object.keys(resourceMap).map((resource) => ({
          resource,
          actions: Object.values(resourceMap[resource]),
        }));
      };

      const groupedData = uniqueActionsPerResource(action);
      setAccess(groupedData);
    }
  }, [action]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredData = access.filter(
      (group) =>
        group.resource.toLowerCase().includes(lowercasedQuery) ||
        group.actions.some((action) =>
          action.action.toLowerCase().includes(lowercasedQuery),
        ),
    );
    setFilterData(newFilteredData);
  }, [searchQuery, access]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold capitalize">
          {actiopnName.split("_").join(" ")}
        </h2>
        <Input
          style={{ width: "320px" }}
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {loading ? (
          <div
            style={{ height: "calc(100vh - 300px)" }}
            className="flex justify-center items-center"
          >
            <Loader />
          </div>
        ) : (
          <>
            {filterData?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filterData.map((item, index) => (
                  <ShowAllRoles
                    key={index}
                    resource={item.resource}
                    actions={item.actions}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{ height: "calc(100vh - 300px)" }}
                className="relative w-full"
              >
                <Watermark text="Access Not Found" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
