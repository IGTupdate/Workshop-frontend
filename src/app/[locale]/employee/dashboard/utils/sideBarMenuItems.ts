import { CustomerSideBarMenuItems } from "@/app/[locale]/dashboard/__components/__desktopComponents/CustomerSideBarMenuItems";
import { AbilityTuple, MongoAbility, MongoQuery } from "@casl/ability";
import { MenuProps } from "antd";
import { useTranslations } from "next-intl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type TsideBarMenuItems = {
  key: string;
  label: string;
  pathname?: string;
  children?: TsideBarMenuItems[];
  resourcetype?: string;
};

export const SideBarMenuItems: () => TsideBarMenuItems[] = () => {
  const t = useTranslations("EmployeeSideBar");
  return [
    {
      key: "1",
      label: t("dashboard"),
      pathname: "/employee/dashboard",
      resourcetype: "dashboard",
    },
    {
      key: "2",
      label: t("appointment"),
      pathname: "/employee/dashboard/appointment",
      resourcetype: "appointment",
    },
    {
      key: "3",
      label: t("workOrder"),
      pathname: "/employee/dashboard/workorder",
      resourcetype: "workorder",
    },
    {
      key: "4",
      label: t("vehicleManagement"),
      children: [
        {
          key: "4.1",
          label: t("vehicleManagementCheckList"),
          resourcetype: "vehicle-checklist",
          pathname: "/employee/dashboard/vehicle/checklist",
        },
        {
          key: "4.2",
          label: t("vehicleEntry"),
          resourcetype: "vehicle-entry",
          pathname: "/employee/dashboard/vehicle/vehicleEntry",
        },
      ],
    },
    {
      key: "5",
      label: t("ramp"),
      pathname: "/employee/dashboard/ramp",
      resourcetype: "ramp",
    },
    {
      key: "6",
      label: t("slotManagement"),
      children: [
        {
          key: "6.1",
          label: t("calender"),
          pathname: "/employee/dashboard/slot-management/calender",
          resourcetype: "calender",
        },
        {
          key: "6.2",
          label: t("slotSchedule"),
          pathname: "/employee/dashboard/slot-management/slot-schedule",
          resourcetype: "slot_schedule",
        },
      ],
    },
    {
      key: "7",
      label: t("servicePlans"),
      children: [
        {
          key: "7.1",
          label: t("category"),
          resourcetype: "category",
          pathname: "/employee/dashboard/servicePlan/category",
        },
        {
          key: "7.2",
          label: t("tasks"),
          resourcetype: "tasks",
          pathname: "/employee/dashboard/servicePlan/category",
        },
      ],
    },
    {
      key: "8",
      label: t("employeeManagement"),
      // pathname: "/employee/dashboard/employee",
      // resourcetype: "employee",
      children: [
        {
          key: "8.1",
          label: t("employee"),
          pathname: "/employee/dashboard/employee",
          resourcetype: "employee",
        },
        {
          key: "8.2",
          label: t("role"),
          pathname: "/employee/dashboard/employee/role",
          resourcetype: "role",
        },
      ],
    },
    {
      key: "9",
      label: t("tool"),
      pathname: "/employee/dashboard/tool",
      resourcetype: "tool",
    },
    {
      key: "10",
      label: t("settings"),
      pathname: "/employee/dashboard/settings",
      resourcetype: "settings",
    },
  ];
};

export const commonResources = ["profile", "dashboard", "vehicle-checklist"];

export function getSideBarMenuItems(
  router: AppRouterInstance,
  sideBarMenuItems: TsideBarMenuItems[],
  dashBoardIcons: any,
  ability?: MongoAbility<AbilityTuple, MongoQuery> | undefined,
): MenuProps["items"] {
  const sideBarMenus = sideBarMenuItems.map((item) => {
    let children = item.children
      ? getSideBarMenuItems(router, item.children, dashBoardIcons, ability)
      : undefined;
    return {
      ...item,
      children,
      icon: dashBoardIcons[item.label],
      onClick: () => {
        if (item.pathname) {
          router.push(item.pathname);
        }
      },
    };
  });

  const filteredSideBarMenus = sideBarMenus.filter((el) => {
    // eitehr
    if (!ability) return false;
    // include if any of the children are accessible
    if (el.children && el.children.length > 0) return true;
    // include if it is common resource type
    if (commonResources.includes(el.resourcetype || "")) return true;

    // include if it has the access
    const subject = el.resourcetype || "";
    const actions = ["get", "update", "create", "delete"];

    const can_perform_action = actions.find((action) => {
      // console.log(subject, action);
      // console.log(ability && ability.can(action, subject))
      return ability && ability.can(action, subject);
    });

    return can_perform_action !== undefined;
  });

  return ability != undefined ? filteredSideBarMenus : sideBarMenus;
}

export const findRecursiveByPathName = (
  sideBarMenuItems: TsideBarMenuItems[],
  pathname: string,
): TsideBarMenuItems | null => {
  for (const item of sideBarMenuItems) {
    // console.log(pathname, item?.pathname?.substring(19), pathname.substring(19).includes(item?.pathname?.substring(19)|| "-" ))
    if (
      item.pathname &&
      (pathname === item.pathname ||
        pathname
          .substring(pathname.split("/")[2] === "dashboard" ? 10 : 19)
          .includes(
            item.pathname.substring(
              pathname.split("/")[2] === "dashboard" ? 10 : 19,
            ) || "-",
          ))
    ) {
      return item;
    } else if (item.children) {
      const required_item = findRecursiveByPathName(item.children, pathname);
      if (required_item) return required_item;
    }
  }

  return null;
};

export const findRecursiveByPathNameExact = (
  sideBarMenuItems: TsideBarMenuItems[],
  pathname: string,
): TsideBarMenuItems | null => {
  let newPathname = pathname.replace(/^\/(sp|en)/, "");

  if (Array.isArray(sideBarMenuItems)) {
    for (const item of sideBarMenuItems) {
      // Ensure item has a pathname property and compare it with newPathname
      if (item.pathname && newPathname === item.pathname) {
        return item;
      } else if (item.children) {
        // Recursively search in children
        const required_item = findRecursiveByPathNameExact(
          item.children,
          newPathname,
        );
        if (required_item) return required_item;
      }
    }
  }

  return null;
};

export function getActiveSideBarMenu(pathname: string): string {
  const active_menu = findRecursiveByPathNameExact(
    pathname.split("/")[2] === "dashboard"
      ? CustomerSideBarMenuItems()
      : SideBarMenuItems(),
    pathname,
  );
  if (!active_menu) return "1";
  return active_menu.key;
}
