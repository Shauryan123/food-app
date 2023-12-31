import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../context/actions/ordersAction";
import { getAllOrder } from "../api";
import {OrderData} from "../components";

const DBOrders = () => {

  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);
  return <div className="flex flex-col items-center justify-center gap-4 pt-6 w-full">
    {orders ? <>{orders.map((item, i) => {
      return (<OrderData key={i} index={i} data={item} admin={true}/>)
    })}</> : <><h1 className="text-[72px] text-center text-black font-bold">No Data</h1></>}
  </div>;
};

export default DBOrders;
