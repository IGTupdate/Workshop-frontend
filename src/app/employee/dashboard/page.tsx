'use client'
import React, { useEffect } from 'react'
import { useAppSelector } from "@/app/store/reduxHooks";
import { redirect } from "next/navigation";

type Props = {}

const Page = (props: Props) => { 
  const isEmployee = useAppSelector((state) => state.auth.isEmployee)
  useEffect(() => {
    if(!isEmployee) redirect('/login')
  },[isEmployee])

  return (
    <div>
      this is the me
    </div>
  )
}

export default Page
