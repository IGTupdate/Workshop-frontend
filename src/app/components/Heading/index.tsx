import React from 'react'
import HeadingStyle1, { THeadingStyle1Props } from './HeadingStyle1'



type Props = THeadingStyle1Props

const Heading = (props: Props) => {
  const headings = {
    heading1: <HeadingStyle1 {...props} />,
    // other heading styles if any
  }

  return headings[props.type] || <></>
}

export default Heading