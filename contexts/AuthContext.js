import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt.js";
import { message } from "antd";

import { Alert, Button, Space } from "antd";

const AuthContext = createContext();

var initialData = {
  status: "",
  message: "",
  token: "",
  detail: {},
  list: [],
  isInitialized: false,
  isAuthenticated: false,
};
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
  style: "fontSize:20px",
});

const AuthProvider = (props) => {
  //   const { t } = useTranslation();
  const router = useRouter();
  const [state, setState] = useState(initialData);

  useEffect(() => {
    const detail = localStorage.getItem("beauty_detail");

    const initialData1 = detail === "undefined" ? null : detail;
    var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
    var accessToken = localStorage.getItem("accessToken");

    if (isValidToken(accessToken)) {
      setSession(accessToken);
    }
    // console.log(initialData.shareholder.voted);

    setState({
      ...state,
      status: "success",
      message: "",
      token: accessToken !== null ? accessToken : "",
      detail: initialData !== null ? initialData : {},
      isInitialized: true,
      isAuthenticated: accessToken !== null ? isValidToken(accessToken) : false,
    });
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const eventFun = () => {
    var detail = localStorage.getItem("beauty_detail");

    const initialData1 = detail === "undefined" ? null : detail;
    var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
    // var initialData = detail !== null ? JSON.parse(detail) : {};
    var accessToken = localStorage.getItem("accessToken");
    var company = localStorage.getItem("companyId");

    if (isValidToken(accessToken)) {
      setSession(accessToken);
    }

    setState({
      ...state,
      status: "success",
      message: "",
      token: accessToken !== null ? accessToken : "",
      detail: initialData !== null ? initialData : {},
      isInitialized: true,
      isAuthenticated: accessToken !== null ? isValidToken(accessToken) : false,
    });
  };

  const LoadingFun = () => {
    var config20 = {
      className: "text-[16px]   ",
      duration: 0.7,
      content: "message_loading",
    };
    message.loading(<div className="text-[20px]">message_loading</div>);
  };

  const DeleteMess = () => {
    messageApi.destroy();
  };

  //   ####  #  ####  #    # # #    #
  //  #      # #    # ##   # # ##   #
  //   ####  # #      # #  # # # #  #
  //       # # #  ### #  # # # #  # #
  //  #    # # #    # #   ## # #   ##
  //   ####  #  ####  #    # # #    #

  const signIn = async ({ email, password }) => {
    // console.log(email, password);
    setState({
      ...state,
      status: "loading",
      message: "loading",
    });

    var config = {
      url: "/users/login",
      method: "post",
      data: {
        email: email,
        password: password,
      },
    };
    LoadingFun();
    try {
      const response = await axios(config);
      const { data, accessToken } = response?.data;
      var detail = JSON.stringify(data);
      // console.log(first)
      var auth_detail = {
        detail: data,
        token: accessToken,
        isAuthenticated: isValidToken(accessToken),
      };
      // console.log(auth_detail)
      localStorage.setItem("beauty_detail", detail);
      // console.log(data.shareholder?.voted);

      setSession(accessToken);
      setState({
        ...state,
        voted: data.shareholder?.voted,
        status: "success",
        ...auth_detail,
      });
      message.success(
        <div className="text-[20px]">Та амжилттай нэвтэрлээ</div>
      );
      if (data?.user?.status == 0) {
        router.push("/admin");
      } else {
        router.push("/services");
      }
      //   DeleteMess();
    } catch (err) {
      // console.log(err);
      setState({
        ...state,
        status: "error",
        message: err?.message,
      });
      DeleteMess();
      message.error(<div className="text-[20px]">{err?.message}</div>);
    }
  };

  //   ####  #  ####  #    # #    # #####
  //  #      # #    # ##   # #    # #    #
  //   ####  # #      # #  # #    # #    #
  //       # # #  ### #  # # #    # #####
  //  #    # # #    # #   ## #    # #
  //   ####  #  ####  #    #  ####  #

  const signUp = async ({ firstName, lastName, email, phone, password }) => {
    let body = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    var config = {
      url: "/users/register",
      method: "post",
      data: {
        ...body,
      },
    };
    // console.log(config);
    LoadingFun();

    try {
      const response = await axios(config);
      const { data } = response;
      // const { data } = response?.data
      setState({
        ...state,
        status: "success",
      });
      DeleteMess();
      message.success(
        <div className="text-[20px]">{"message_signedUp_successfully"}</div>
      );
      router.push("/auth/sign-in");
      // signIn({ email: email, password: password, companyId: companyId });
      // router.push('/auth/confirmation')
    } catch (err) {
      // console.log("aldaaa ", err);
      if (err.message === "SequelizeUniqueConstraintError: Validation error") {
        setState({
          ...state,
          status: "error",
          message:
            "Тухайн и-мэйл хаяг бүртгэлтэй байна. Та өөрийн бүртгэлээр нэвтэрнэ үү.",
        });
      } else {
        setState({
          ...state,
          status: "error",
          message: err?.message,
        });
      }
      DeleteMess();
      message.error(<div className="text-[20px]">{err?.message}</div>);
    }
  };

  const getAllUsers = async () => {
    // console.log("worked");
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: "/users",
      method: "get",
      data: {},
    };

    try {
      var response = await axios(config);
      //   console.log("response", response);
      const { data } = response.data;
      // console.log("data", data);
      setState({
        ...state,
        status: "success",
        list: data,
        message: "",
      });
      // }
    } catch (err) {
      console.log("err", err);
      if (err?.statusCode === 409) {
        router.push("/");
      }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
    }
  };

  const CreateUser = async (value) => {
    // let body = { value };
    // console.log("body", body);
    setState({
      ...state,
      status: "loading",
      message: "",
    });
    // console.log(body)

    var config = {
      url: "/users",
      method: "post",
      data: {
        ...value,
      },
    };
    LoadingFun();
    try {
      var response = await axios(config);
      const { data } = response.data;
      setState({
        ...state,
        status: "success",
      });
      message.success("Хэрэглэгч амжилттай үүслээ.");
      // CompanyBydetails(companyId)
      // console.log('2222')
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
      if (
        err?.message == "Your [1] permission has been denied to do this action"
      ) {
        message.error("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна.", 2);
      } else message.error(err?.message);
      DeleteMess();
    }
  };
  const UpdateUser = async ({
    email,
    firstName,
    lastName,
    password,
    phone,
    status,
    id,
  }) => {
    // let body = { value };
    let body = { email, firstName, lastName, password, phone, status };
    // console.log("body", body);
    setState({
      ...state,
      status: "loading",
      message: "",
    });
    // console.log(body)

    var config = {
      url: `/users/${id}`,
      method: "put",
      data: {
        ...body,
      },
    };
    LoadingFun();
    try {
      var response = await axios(config);
      const { data } = response.data;
      setState({
        ...state,
        status: "success",
      });
      message.success("Хэрэглэгч амжилттай шинэчлэлээ");
      // CompanyBydetails(companyId)
      // console.log('2222')
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
      if (
        err?.message == "Your [1] permission has been denied to do this action"
      ) {
        message.error("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна.", 2);
      } else message.error(err?.message);
      DeleteMess();
    }
  };

  const DeleteUser = async (value) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/users/${value}`,
      method: "delete",
      // data: {
      //   ...body,
      // },
    };
    LoadingFun();
    try {
      var response = await axios(config);
      const { data } = response.data;
      setState({
        ...state,
        status: "success",
      });
      message.success("Хэрэглэгч амжилттай устлаа");
      // success();
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
      if (
        err?.message == "Your [1] permission has been denied to do this action"
      ) {
        message.error("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна.", 2);
      } else message.error(err?.message);
      DeleteMess();
    }
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        contextHolder,
        signIn,
        signUp,
        getAllUsers,
        CreateUser,
        UpdateUser,
        DeleteUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
