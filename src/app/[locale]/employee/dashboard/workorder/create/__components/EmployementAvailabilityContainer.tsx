import React, { useEffect, useState } from "react";
import { EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Skeleton, Switch, Typography } from "antd";
import { TEmployeeWorkStatus } from "@/app/types/employee";
import { getEmployeeWorkingStatus } from "@/app/services/operations/workorder/workorder";
import AdvisorDetailDrawer from "./AdvisorDetailDrawer";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Meta } = Card;

type Props = {
  role: string;
  handleSetlect: (advisorId: string) => void;
  selectedAdvisor: string;
};

const EmployementAvailabilityContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [advisors, setAdvisors] = useState<TEmployeeWorkStatus[]>([]);
  const [activeAdvisor, setActiveAdvisor] =
    useState<TEmployeeWorkStatus | null>(null);

  useEffect(() => {
    if (loading) {
      loaddEmployeeWorkStatus();
    }
  }, [loading]);

  const loaddEmployeeWorkStatus = async () => {
    setLoading(true);
    try {
      const response = await getEmployeeWorkingStatus(props.role);
      console.log(response);
      setAdvisors(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openDrawer = (data: TEmployeeWorkStatus) => {
    setActiveAdvisor(data);
  };

  const handleAdvisorSelect = (value: string) => {
    if (value === props.selectedAdvisor) {
      props.handleSetlect("");
    } else {
      props.handleSetlect(value);
    }
  };

  return (
    <div>
      <div className="mt-8">
        <Title level={5}>Select Advisor for the work order</Title>
      </div>

      {loading ? (
        <CardSkeleton loading={loading} />
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          {advisors.map((advisor) => {
            return (
              <Card
                key={advisor._id}
                className="rounded-xl"
                loading={loading}
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <SettingOutlined
                    key="setting"
                    onClick={() => {
                      openDrawer(advisor);
                    }}
                  />,
                  <Button
                    key="button"
                    type={
                      props.selectedAdvisor !== advisor._id
                        ? "default"
                        : "primary"
                    }
                    onClick={() => {
                      handleAdvisorSelect(advisor._id);
                    }}
                  >
                    {props.selectedAdvisor !== advisor._id
                      ? "Select"
                      : "Selected"}
                  </Button>,
                ]}
              >
                <Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={advisor.fullName}
                  description={`Assigned with ${advisor.assigned_workOrder.length} work orders.`}
                />
              </Card>
            );
          })}
        </div>
      )}

      <AdvisorDetailDrawer
        activeAdvisor={activeAdvisor}
        setActiveAdvisor={setActiveAdvisor}
      />
    </div>
  );
};

const CardSkeleton = ({ loading }: { loading: boolean }) => {
  return (
    <Card
      loading={loading}
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <SettingOutlined key="setting" />,
        // <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={<Avatar />}
          title={"Title"}
          description={`Assigned with work orders.`}
        />
      </Skeleton>
    </Card>
  );
};

export default EmployementAvailabilityContainer;
