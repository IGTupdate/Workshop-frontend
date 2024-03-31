"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Space, TableColumnType } from "antd";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import type { GetRef } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";

type InputRef = GetRef<typeof Input>;

type DataIndex = string;

// T is the type of data in the table
function getColumnSearchProps<T>(dataIndex: DataIndex): TableColumnType<T> {
  // states
  /*
  searchText : will update on the click of serach and filter
  searchedColumn: will be used in 
  */
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<InputRef>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      if (!value || value === "")
        return removeQueryParams(searchParams.toString(), name);
      else return setQueryParams(searchParams.toString(), name, value);
    },
    [searchParams]
  );

  // update the router on search text
  useEffect(() => {
    console.log("changed");
    const queryParmas = createQueryString(dataIndex, searchText);
    router.push(`${pathname}?${queryParmas}`);
  }, [searchText]);

  useEffect(() => {
    setSearchText(searchParams.get(dataIndex) || "");
  }, [searchParams]);

  // search button click
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // reset button click
  const handleReset = (clearFilters: (() => void) | undefined) => {
    setSearchedColumn(dataIndex);
    setSearchText("");
    clearFilters && clearFilters();
  };

  // const handleFilter = (
  //   selectedKeys: string[],
  //   confirm: FilterDropdownProps["confirm"],
  //   dataIndex: DataIndex
  // ) => {
  //   confirm({ closeDropdown: false });
  //   setSearchText((selectedKeys as string[])[0]);
  //   setSearchedColumn(dataIndex);
  // };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search by ${dataIndex}`}
          value={selectedKeys[0]}
          defaultValue={searchText}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            className="bg-blue1"
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              handleFilter(selectedKeys as string[], confirm, dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    // render: (text) => {
    //   console.log(text)
    //   return searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   );
    // },
  };
}

export default getColumnSearchProps;
