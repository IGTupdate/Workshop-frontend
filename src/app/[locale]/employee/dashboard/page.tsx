"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "antd";
import Watermark from "@/app/components/Text/WatermarkText";
import { getDahsboardKanbanData } from "@/app/services/operations/workorder/workorder";
import {
  TDashboardKanbanDataResponse,
  TkanbanValue,
} from "@/app/types/work-order";
import Loader from "@/app/components/Loader";

type Props = {};

const Page = (props: Props) => {
  const [kanbanData, setKanbanData] = useState<
    {
      heading: string;
      cards: TkanbanValue[];
    }[]
  >([]);
  const [filterData, setFilterData] = useState<
    {
      heading: string;
      cards: TkanbanValue[];
    }[]
  >([]);
  const [filteredData, setFilteredData] = useState<
    {
      heading: string;
      cards: TkanbanValue[];
    }[]
  >([]);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoader(true);
    try {
      const result = await getDahsboardKanbanData();

      if (result.success === true) {
        const Data = result?.data as TDashboardKanbanDataResponse;
        const arr: { heading: string; cards: TkanbanValue[] }[] = [];
        Object.keys(Data)?.forEach((item) => {
          console.log(item, "item");
          arr.push({
            heading: item,
            cards: Data[item].map((item) => {
              return {
                ...item.customer_id,
                ...item.vehicle_id,
                ...item,
              } as any;
            }) as TkanbanValue[],
          });
        });
        setKanbanData(arr);
        setFilterData(arr);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value || value == " ") {
      setFilteredData([]);
      return;
    }
    const lowerCaseValue = value.toLowerCase();

    const filter = kanbanData?.map((item) => {
      const filteredCards = item.cards.filter((card) =>
        Object.values(card).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(lowerCaseValue),
        ),
      );
      return {
        heading: item.heading,
        cards: filteredCards,
      };
    });

    setFilteredData(filter);
  };

  return (
    <>
      {loader ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div>
          {kanbanData?.length > 0 ? (
            <div>
              <div className="w-80 mb-8">
                <Input placeholder="Search" onChange={handelChange} />
              </div>

              <div className="flex gap-4 flex-nowrap justify-between w-full overflow-auto">
                {kanbanData?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 min-w-80 rounded-xl mb-4"
                  >
                    <div className="flex justify-between items-center mb-3 sticky top-0 w-full left-0 bg-slate-200 p-4 rounded-xl">
                      <h3 className="font-semibold text-xl text-nowrap">
                        {item.heading}
                      </h3>
                      <p className="bg-black text-white rounded-md flex justify-center items-center text-lg h-6 min-w-6 p-1">
                        {item.cards.length}
                      </p>
                    </div>

                    <div className="overflow-auto h-[60vh] scrollbar-thin">
                      {item.cards.length > 0 ? (
                        [...item.cards]
                          .sort((a, b) => {
                            const aMatch =
                              filteredData[
                                i
                              ]?.cards[0]?.registeration_number.toLowerCase() ===
                              a.registeration_number.toLowerCase();
                            const bMatch =
                              filteredData[
                                i
                              ]?.cards[0]?.registeration_number.toLowerCase() ===
                              b.registeration_number.toLowerCase();
                            if (aMatch) return -1;
                            else return 1;
                            // return bMatch - aMatch;
                          })
                          .map((item, index) => (
                            <div
                              key={index}
                              className="rounded-lg mb-3 p-4 mx-3"
                              style={{
                                background:
                                  filteredData[
                                    i
                                  ]?.cards[0]?.registeration_number.toLowerCase() ===
                                  item.registeration_number.toLowerCase()
                                    ? "#B5A22E"
                                    : "white",
                              }}
                            >
                              <h3
                                className="font-bold capitalize text-lg"
                                style={{
                                  color:
                                    filteredData[
                                      i
                                    ]?.cards[0]?.registeration_number.toLowerCase() ===
                                    item.registeration_number.toLowerCase()
                                      ? "white"
                                      : "black",
                                }}
                              >
                                {item.fullName}
                              </h3>
                              <p
                                className="mt-2 flex justify-between items-center"
                                style={{
                                  color:
                                    filteredData[
                                      i
                                    ]?.cards[0]?.registeration_number.toLowerCase() ===
                                    item.registeration_number.toLowerCase()
                                      ? "white"
                                      : "black",
                                }}
                              >
                                <span className="font-semibold text-base">
                                  Vehicle number :
                                </span>
                                <span className="mt-[3px] uppercase">
                                  {item.registeration_number}
                                </span>
                              </p>
                              <p
                                className="mt-2 flex justify-between items-center"
                                style={{
                                  color:
                                    filteredData[
                                      i
                                    ]?.cards[0]?.registeration_number.toLowerCase() ===
                                    item.registeration_number.toLowerCase()
                                      ? "white"
                                      : "black",
                                }}
                              >
                                <span className="font-semibold text-base">
                                  Vehicle Model :
                                </span>
                                <span className="mt-[3px] uppercase">
                                  {item.vehicle_model}
                                </span>
                              </p>
                              <p
                                className="mt-2 flex justify-between items-center"
                                style={{
                                  color:
                                    filteredData[
                                      i
                                    ]?.cards[0]?.registeration_number.toLowerCase() ===
                                    item.registeration_number.toLowerCase()
                                      ? "white"
                                      : "black",
                                }}
                              >
                                <span className="font-semibold text-base">
                                  Contact number :
                                </span>
                                <span className="mt-[3px]">
                                  {item.contactNumber}
                                </span>
                              </p>
                            </div>
                          ))
                      ) : (
                        <div className="relative h-24">
                          <Watermark text="No Data Found" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ height: "calc(100vh - 200px)" }} className="relative">
              <Watermark text="No Data Found" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
