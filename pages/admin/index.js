// system import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// global state
// import useMenu from "../../hooks/useMenu";
import useAuth from "../../hooks/useAuth";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import UserMenu from "../../components/admin/users/userMenu";
import CreateUser from "../../components/admin/users/createUser";
import UpdateUser from "../../components/admin/users/updateUser";
// import CreateMenuTitle from "../../components/Admin/createMenuTitle";
// import EditMenuTitle from "../../components/Admin/EditMenuTitle";
// import UpdateMenu from "../../components/Admin/updateMenu";
import { Table, Button, Row, Col, Modal } from "antd";
import { message } from "antd";
import Head from "next/head";

const render = ({ data, events, tr }) => {
  console.log("data", data);
  // const dataDetails = [...data?.room];
  return (
    <div className="min-h-screen min-[350px]:px-12">
      <Head>
        <title>Админ хэсэг</title>
      </Head>
      <div>
        <div>
          <Modal
            title={data?.form?.header}
            open={data?.form?.visible}
            // onOk={events.handleOk}
            onCancel={events.handleCancel}
            footer={[
              <Button key="back" onClick={events.handleCancel}>
                БУЦАХ
              </Button>,
            ]}
            width={1000}
          >
            {events.handleFormRender(data?.form?.formType, data, events)}
          </Modal>
        </div>
        <UserMenu data={data} events={events} />
      </div>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const user = useAuth();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/");
      message.error("Та нэвтэрч орно уу!");
    }
    user.getAllUsers();
  }, []);

  const [mainForm, setMainForm] = useState({
    formType: "",
    data: "",
    visible: false,
    header: "",
    message: "",
  });
  const handleFormData = (e) => {
    setMainForm({
      func: e.form,
      header: e.header,
      data: e.data,
      visible: true,
      formType: e.formType,
      message: e.message,
      // id: auth?.state?.loggedInCompany,
    });
  };

  const handleFormRender = (type, data, events) => {
    console.log("data", data?.form?.data);
    switch (type) {
      case "createUser":
        return <CreateUser data={data} events={events} />;
      case "updateUserForm":
        return <UpdateUser data={data} events={events} />;
        // case "delete":
        //   // console.log(data?.form?.data?.type)
        //   return (
        //     <div>
        //       {data?.form?.message}
        //       <div className="my-3 flex">
        //         <Button
        //           onClick={() => {
        //             handleDelete(data?.form?.data?.id);
        //           }}
        //           type="primary"
        //           danger
        //         >
        //           Тийм
        //         </Button>
        //       </div>
        //     </div>
        //   );
        break;
      default:
        return <div>hi</div>;
    }
  };
  const handleOnClick = (value) => {
    // console.log("clicked");s
    // company.SetLogo(value.logo);
    // router.push("/auth/login");
  };
  const handleCancel = (value) => {
    setMainForm({
      visible: false,
    });
  };
  const handleCreateUser = async (value) => {
    // console.log("clicked", value);
    await user.CreateUser(value);
    setMainForm({
      visible: false,
    });
    user.getAllUsers();
  };
  return (
    <React.Fragment>
      <h1
        className="mb-2 pt-2"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Админ хэсэг
      </h1>
      {/* {menu?.contextHolder} */}
      <DataDisplayer
        // error={menu?.state?.message}
        // status={menu?.state?.status}
        status={user?.state?.status}
        data={{
          userList: user?.state?.list,
          form: mainForm,
        }}
        render={render}
        events={{
          //   updateMenuTitle: updateMenuTitle,
          //   deleteMenuTitle: deleteMenuTitle,
          handleClick: handleOnClick,
          handleFormData: handleFormData,
          handleFormRender: handleFormRender,
          handleCreateUser: handleCreateUser,
          //   handleCreateTitle: handleCreateTitle,
          //   handleUpdate: handleUpdate,
          handleCancel: handleCancel,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
