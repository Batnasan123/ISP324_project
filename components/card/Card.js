import React, { useEffect, useState } from "react";
// import moment from "moment";
import { Card } from "antd";

const Cards = (props) => {
  const { data, events } = props;

  useEffect(() => {}, []);
  const service_clicked = () => {
    // console.log("service_clicked", data.id);
    events.onClick(data?.id, data?.serviceName, data?.price);
  };
  return (
    <Card
      // onClick={() => events.onClick({ id: data.id, logo: data.logo })}
      key={data.index}
      onClick={service_clicked}
      hoverable
      className="w-full .min-h-[150px]  border border-[#0F285F] border-opacity-30 "
      size="small"
      cover={
        <div
          // className="h-40 overflow-hidden rounded-xl"
          style={
            {
              // backgroundImage: "url(" + data?.logo + ")",
              // backgroundPosition: "center",
              // objectFit: "cover",
              // backgroundRepeat: "no-repeat",
              // backgroundSize: "cover",
              // backgroundSize: "140px",
              // width: "full",
            }
          }
        />
      }
    >
      <div className="min-h-[120px]">
        <div className="mb-5 h-auto .h-[50px] text-left text-[18px] .font-bold">
          <div className=".font-bold">
            Үйлчэлгээний нэр:{" "}
            <span className="font-bold">{data?.serviceName}</span>
          </div>
          <div className=".font-bold">
            Үйлчилгээний статус:{" "}
            <span className="font-bold">{data?.status}</span>
          </div>
          <div className=".text-[12px] mt-1">
            Үнэ: <span className="font-bold">{data?.price}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Cards;
