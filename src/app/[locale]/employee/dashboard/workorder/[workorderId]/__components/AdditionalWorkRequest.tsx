"use client";

import { Button, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import RequestAdditonalWorkDrawerContainer from "./RequestAdditonalWorkDrawerContainer";
import { TAdditonalWorkRequest } from "@/app/types/work-order";
import { getAdditionalWokrRequest } from "@/app/services/operations/workorder/additional-work";
import { useParams } from "next/navigation";
import DescriptionItem from "@/app/components/DescriptionItem.tsx";

const { Title } = Typography;

type Props = {};

const AdditionalWorkRequest = (props: Props) => {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [workRequests, setWorkRequests] = useState<TAdditonalWorkRequest[]>([]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const querystring = `workOrderId=${params.workorderId}`;
        const response = await getAdditionalWokrRequest(querystring);

        setWorkRequests(response.data as TAdditonalWorkRequest[]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Title level={5}>Additional Work</Title>
        <RequestAdditonalWorkDrawerContainer />
      </div>
      <div className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {workRequests.map((el, index) => {
              return (
                <div key={index} className="border rounded-md p-2 mb-3">
                  <div className="grid grid-cols-2 gap-3">
                    <DescriptionItem
                      title="Estimated Cost"
                      content={el.estimatedCost}
                    />
                    <div className="relative">
                      <Tag className="absolute top-2 right-2">{el.status}</Tag>
                    </div>
                    <div className="col-span-2">
                      <DescriptionItem
                        title="Description"
                        content={el.description}
                      />
                    </div>
                    <div>
                      <h2 className="text-md font-semibold">Tasks</h2>
                      <ul>
                        {el.tasks.map((task) => {
                          return (
                            <li key={task._id} className="flex justify-between">
                              <p>
                                {task.title} {task.critical && "(Critical)"}
                              </p>
                              <b>{task.approved}</b>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-md font-semibold">Parts</h2>
                      <ul>
                        {el.tasks.map((task) => {
                          return task.partsRequired.map((part) => {
                            return (
                              <li
                                key={task._id}
                                className="flex justify-between"
                              >
                                <p>{part.partName} </p>
                                <b>{part.price || "-"}</b>
                              </li>
                            );
                          });
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalWorkRequest;
