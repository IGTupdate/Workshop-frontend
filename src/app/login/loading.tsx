import React from 'react'
import Loader from '../components/Loader'

type Props = {}

const loading = (props: Props) => {
  return (
    <div className=' h-screen flex justify-center items-center'>
        <Loader />
    </div>
  )
}

export default loading