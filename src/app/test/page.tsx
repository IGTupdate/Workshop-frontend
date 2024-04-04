'use client'
import { getAllSlotSchedule } from '../services/operations/appointment/slotSchedule'

type Props = {}

const page = (props: Props) => {
    const handleClick = async () => {
        try{
            const res = await getAllSlotSchedule()
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    // handleClick()
  return (
    <div>
        <button onClick={() => handleClick()}>Hello</button>
    </div>
    // <></>
  )
}

export default page

// import { cookies } from 'next/headers'
 
// export default function Page() {
//   const cookieStore = cookies()
//   return cookieStore.getAll().map((cookie) => (
//     <div key={cookie.name}>
//       <p>Name: {cookie.name}</p>
//       <p>Value: {cookie.value}</p>
//     </div>
//   ))
// }