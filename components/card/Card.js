import React, { useEffect, useState } from "react";
// import moment from "moment";
import { Card } from "antd";

const Cards = (props) => {
  const { data, events } = props;

  useEffect(() => {}, []);

  return (
    <Card
      // onClick={() => events.onClick({ id: data.id, logo: data.logo })}
      key={data.index}
      hoverable
      className="w-full  border border-[#0F285F] border-opacity-30 "
      size="small"
      cover={
        <div
          className="h-40 overflow-hidden rounded-xl"
          style={{
            // backgroundImage: "url(" + data?.logo + ")",
            backgroundPosition: "center",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // backgroundSize: "140px",
            // width: "full",
          }}
        />
      }
    >
      <div>
        <div className="mb-5 h-auto .h-[50px] text-left text-[18px] font-bold">
          <div className="font-bold">Өрөөний дугаар: {data?.status}</div>
          <div className="font-bold">Үнэ: {data?.serviceName}</div>
          <div className="text-[12px] mt-1">{data?.price}</div>
        </div>
        {/* <div className="m-1 flex justify-between text-[12px] xl:text-[16px] ">
          <div className="font-bold">{data?.roomName}</div>
        </div>
        <div className="m-1 flex justify-between text-[12px] xl:text-[16px]">
          <div className="] font-bold">{data?.price}</div>
        </div> */}
      </div>
    </Card>
  );
};

export default Cards;
