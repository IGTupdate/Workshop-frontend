"use client";
import { useRouter } from "next/navigation";
import React from "react";

type props = {
  role: string;
  id: string;
  createdAt: string;
};
const RoleCards = ({ role, id, createdAt }: props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/employee/dashboard/roleManagement/${id}`)}
      className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white cursor-pointer"
    >
      <h2 className="text-xl font-bold mb-2 capitalize">
        {role.split("_").join(" ")}
      </h2>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default RoleCards;
