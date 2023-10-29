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
      router.push("/services");
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

  //   //signOut
  //   const signOut = () => {
  //     setSession(null);
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("companyId");
  //     localStorage.removeItem("beauty_detail");
  //     setState({
  //       ...state,
  //       status: "success",
  //       message: "",
  //       isAuthenticated: false,
  //       detail: {},
  //     });
  //     // messageApi.open({
  //     //   type: 'success',
  //     //   content: 'Ta системээс гарлаа. ',
  //     //   duration: 12,

  //     // });
  //     var config2 = {
  //       className: "text-xl",
  //       duration: 3,
  //       content: t("meeting_logout"),
  //     };
  //     message.success(<div className="text-[20px]">{t("meeting_logout")}</div>);
  //     // message.success(config2);
  //     router.push("/");
  //   };

  //   const setLoggedInCompany = (companyId) => {
  //     // console.log("2");
  //     localStorage.setItem("companyId", companyId);
  //     // console.log("3");
  //     setState({
  //       ...state,
  //       loggedInCompany: companyId,
  //     });
  //   };
  //
  //   const comment = async (values) => {
  //     var config = {
  //       url: "/comments",
  //       method: "post",
  //       data: {
  //         ...values,
  //       },
  //     };

  //     try {
  //       await axios(config);

  //       setState({
  //         ...state,
  //         status: "success",
  //       });
  //       var config15 = {
  //         className: "text-xl",
  //         duration: 3,
  //         content: t("main_comment_submit_success"),
  //       };
  //       message.success(
  //         <div className="text-[20px]">{t("main_comment_submit_success")}</div>
  //       );
  //       // message.success(config15);
  //     } catch (err) {
  //       setState({
  //         ...state,
  //         // status: "error",
  //         message: err?.message,
  //       });
  //       var config16 = {
  //         className: "text-xl",
  //         duration: 3,
  //         content: t(err?.message),
  //       };
  //       message.error(<div className="text-[20px]">{t(err?.message)}</div>);
  //       //message.error(config16);
  //     }
  //   };

  return (
    <AuthContext.Provider
      value={{
        state,
        // comment,
        signIn,
        // signOut,
        signUp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
