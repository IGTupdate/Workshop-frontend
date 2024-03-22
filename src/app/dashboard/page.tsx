"use client"
import React, { useEffect } from 'react'
import { useAppSelector } from '../store/reduxHooks'
import { redirect } from 'next/navigation'

function Dashboard() {
  const isEmployee = useAppSelector((state) => state.auth.isEmployee)
  useEffect(() => {
    if(isEmployee) redirect('/employee/login')
  },[isEmployee])
  return (
    <div className=' h-screen flex justify-center items-center'>
      Customer Dashboard
    </div>
  )
}

export default Dashboard