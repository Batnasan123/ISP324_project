import React from "react";
import { Table, Button } from "antd";
// import moment from "moment";

export default function Agenda({ data, events }) {
  // console.log(data?.vote)
  // console.log(data?.confirm)
  // console.log(data)
  const columns = [
    {
      title: "№",
      width: 19,
      dataIndex: "list",
      key: "list",
      // fixed: "left",
    },
    {
      title: "firstName",
      width: 150,
      dataIndex: "firstName",
      key: "firstName",
      // fixed: "left",
    },
    {
      title: "lastName",
      dataIndex: "lastName",
      key: "lastName",
      width: 100,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: 100,
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
      width: 100,
    },
    {
      title: "update",
      key: "update",
      // fixed: "right",
      width: 100,
      dataIndex: "update",
    },
    {
      title: "delete",
      key: "delete",
      // fixed: "right",
      width: 100,
      dataIndex: "delete",
    },
  ];
  // console.log(Maindata)
  const data1 = [];
  // const menu_titleIds = [];
  let number = 0;
  data?.userList.map((item, index) => {
    // menu_titleIds.push({ menu_titleId: item });
    number = number + 1;
    // console.log("index", index);
    data1.push({
      key: number,
      list: number,
      email: item?.email,
      firstName: item?.firstName,
      lastName: item?.lastName,
      phone: item?.phone,
      // suspended: (
      //   <div className="flex">
      //     {/* {item.suspended + " / "} */}
      //     <div className="mx-1 rounded-[10px] bg-blue-200 px-1">
      //       {/* {menu?.price}  */}
      //       {new Intl.NumberFormat().format(menu?.price)} ₮
      //     </div>
      //   </div>
      // ),
      // accept: (
      //   <div className="flex">
      //     {/* {item.accept + " / "} */}
      //     <div className="mx-1 rounded-[10px] bg-green-200 px-1">
      //       {item?.title_name}
      //     </div>
      //   </div>
      // ),
      delete: (
        <Button
          onClick={() =>
            events.handleFormData({
              // header: "Хэлэлцэх асуудал",
              formType: "delete",
              // message: item?.item_name + " >> нэртэй меню" + "-г устгах уу?",
              // data: {
              //   item_name: item.item_name,
              //   price: item?.price,
              //   id: item?.id,
              // },
            })
          }
          type="primary"
          danger
        >
          Устгах
        </Button>
      ),
      update: (
        <Button
          onClick={() =>
            events.handleFormData({
              // header: "Хэлэлцэх асуудал",
              formType: "updateUserForm",
              form: "put",
              data: {
                status: item?.status,
                firstName: item?.firstName,
                lastName: item?.lastName,
                email: item?.email,
                phone: item?.phone,
                id: item?.id,
              },
            })
          }
          type="primary"
          ghost
        >
          Өөрчлөх
        </Button>
      ),
    });
  });

  return (
    <div>
      <div className="m-2">
        <Button
          onClick={() =>
            events.handleFormData({
              header: "Меню нэмэх",
              formType: "createUser",
              form: "post",
              // data: [
              //   {
              //     label: "projectId",
              //     value: "",
              //   },
              //   { label: "question", value: "" },
              // ],
            })
          }
        >
          Шинээр хэрэглэгч нэмэх
        </Button>
      </div>
      <Table
        bordered
        pagination={{ pageSize: 30 }}
        columns={columns}
        dataSource={data1}
        scroll={{ x: 1500, y: 700 }}
      />
    </div>
  );
}
