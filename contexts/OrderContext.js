import React, { createContext, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { message } from "antd";

const OrderContext = createContext();

const initialState = {
  status: "",
  message: "",
  modal: false,
  detail: {},
  list: [],
};
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
  style: "fontSize:20px",
});
const DeleteMess = () => {
  messageApi.destroy();
};
const OrderProvider = (props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();
  const createOrder = async (userId, serviceId, employeeId, date, time) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/orders",
      method: "post",
      data: {
        userId: userId,
        serviceId: serviceId,
        employeeId: employeeId,
        date: date,
        time: time,
      },
    };

    try {
      console.log("config", config);
      var response = await axios(config);
      // console.log("response", response);
      const { data } = response.data;
      // console.log("data", data);
      setState({
        ...state,
        status: "success",
        list: data,
        message: "",
      });
      message.success(
        <div className="text-[20px]">Та амжилттай захиалга хийлээ.</div>
      );
    } catch (err) {
      console.log("err", err);
      if (err?.statusCode === 409) {
        // router.push("/");
      }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
      DeleteMess();
      message.error(<div className="text-[20px]">{err?.message}</div>);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        createOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
