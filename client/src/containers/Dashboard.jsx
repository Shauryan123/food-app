import React from 'react'
import { DBLeftSection, DBRightSection } from '../components'

export default function Dashboard() {
  return (
    <div className='w-screen h-screen flex items-center justify-start'>
      <DBLeftSection/>
      <DBRightSection/>
      </div>


  )
}
