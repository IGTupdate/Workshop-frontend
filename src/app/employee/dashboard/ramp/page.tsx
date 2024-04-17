'use client'
import { getAllRampStatus } from '@/app/services/operations/workorder/workorder'
import { useEffect, useState } from 'react'

const Page = () => {

  const [rampData, setRampData] = useState([])

  const allRampsData = async() => {
    try{
      const res = await getAllRampStatus()
      if(res) setRampData(res)
    }catch(err){
    }
  }

  useEffect(() => {
    allRampsData()
  }, [])

  useEffect(() => {
    console.log(rampData)
  }, [rampData])
  
  return (
    // <div><RampList rampData={rampData} onDelete={() => console.log("DELETE")} onUpdate={() => console.log("UPDATE")}/></div>
    <div>Hello</div>
  )
}

export default Page
