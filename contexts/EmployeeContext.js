import React, { createContext, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/router";

const EmployeeContext = createContext();

const initialState = {
  status: "",
  message: "",
  modal: false,
  detail: {},
  list: [],
};

const EmployeeProvider = (props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const loadAllEmployees = async () => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/employee",
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
    <EmployeeContext.Provider
      value={{
        state,
        loadAllEmployees,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
