import { CustomerSideBarMenuItems } from "@/app/dashboard/__components/__desktopComponents/CustomerSideBarMenuItems";
import { AbilityTuple, MongoAbility, MongoQuery } from "@casl/ability";
import { MenuProps } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type TsideBarMenuItems = {
  key: string;
  label: string;
  pathname?: string;
  children?: TsideBarMenuItems[];
  resourcetype?: string;
};

export const sideBarMenuItems: TsideBarMenuItems[] = [
  {
    key: "1",
    label: "Dashboard",
    pathname: "/employee/dashboard",
    resourcetype: "dashboard",
  },
  {
    key: "2",
    label: "Appointment",
    pathname: "/employee/dashboard/appointment",
    resourcetype: "appointment",
  },
  {
    key: "3",
    label: "Work Order",
    pathname: "/employee/dashboard/workorder",
    resourcetype: "workorder",
  },
  {
    key: "4",
    label: "Ramp",
    pathname: "/employee/dashboard/ramp",
    resourcetype: "ramp",
  },
  {
    key: "6",
    label: "Slot Management",
    children: [
      {
        key: "7",
        label: "Calender",
        pathname: "/employee/dashboard/slot-management/calender",
        resourcetype: "calender",
      },
      {
        key: "8",
        label: "Slot Schedule",
        pathname: "/employee/dashboard/slot-management/slot-schedule",
        resourcetype: "slot_schedule",
      },
    ],
  },
  {
    key: "9",
    label: "Employee",
    pathname: "/employee/dashboard/employee",
    resourcetype: "employee",
  },
];

export const commonResources = ["profile", "dashboard"];

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
      icon: dashBoardIcons[item.label.replace(/\s/g, "")],
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

  return ability !== undefined ? filteredSideBarMenus : sideBarMenus;
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
          .substring(pathname.split("/")[1] === "dashboard" ? 10 : 19)
          .includes(
            item.pathname.substring(
              pathname.split("/")[1] === "dashboard" ? 10 : 19,
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
  for (const item of sideBarMenuItems) {
    // console.log(pathname, item?.pathname?.substring(19), pathname.substring(19).includes(item?.pathname?.substring(19)|| "-" ))
    if (item.pathname && pathname === item.pathname) {
      return item;
    } else if (item.children) {
      const required_item = findRecursiveByPathName(item.children, pathname);
      if (required_item) return required_item;
    }
  }

  return null;
};

export function getActiveSideBarMenu(pathname: string): string {
  const active_menu = findRecursiveByPathNameExact(
    pathname.split("/")[1] === "dashboard"
      ? CustomerSideBarMenuItems
      : sideBarMenuItems,
    pathname,
  );
  if (!active_menu) return "1";
  return active_menu.key;
}
