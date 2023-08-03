import React from 'react'
import {DBHeader, DBHome, DBItems, DBNewItem, DBOrders, DBUsers} from '../components'
import { Route, Routes } from 'react-router-dom'


export default function DBRightSection() {
  return (
    <div className='flex flex-col flex-1 py-12 px-12 h-full'>
      <DBHeader/>
      <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
        <Routes>
        <Route path='/home' element={<DBHome/>}></Route>
        <Route path='/orders' element={<DBOrders/>}></Route>
        <Route path='/items' element={<DBItems/>}></Route>
        <Route path='/newItem' element={<DBNewItem/>}></Route>
        <Route path='/users' element={<DBUsers/>}></Route>
        </Routes>
      </div>
    </div>
  )
}
