"use client"
import React, { useEffect } from 'react'
import { useAppSelector } from '../store/reduxHooks'
import { redirect } from 'next/navigation'

function Dashboard() {
  return (
    <div className=' h-screen flex justify-center items-center'>
      Customer Dashboard
    </div>
  )
}

export default Dashboard