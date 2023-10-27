import React, { createContext, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";

const ServiceContext = createContext();

const initialState = {
  status: "",
  message: "",
  modal: false,
  detail: {},
  list: [],
};

const ServiceProvider = (props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const loadAllServices = async () => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/services",
      method: "get",
      data: {},
    };

    try {
      // console.log("config", config);
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
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        state,
        loadAllServices,
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };
