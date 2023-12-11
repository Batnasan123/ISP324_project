import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card } from "antd";
import useService from "../../hooks/useService";

export default function Artist() {
  const service = useService();
  useEffect(() => {
    service.loadAllServices();
  }, []);
  return (
    <div className="px-5 sm:px-[40px] pb-16 .mb-12 вbg-[#ebf3f5]">
      <div className="text-center pt-12 pb-6 sm:px-8">
        {/* <div className="text-[15px] text-gray-500">ҮЙЧИЛГЭЭ</div> */}
        <div className="text-[40px] font-bold">ҮЙЛЧИЛГЭЭНҮҮД</div>
      </div>
      <div>
        <div className="grid .place-items-center gap-3 font-Montserrat sm:grid-cols-2 md:grid-cols-3 .lg:grid-cols-4">
          {service?.state?.list.length > 0 &&
            service?.state?.list.map((item, index) => {
              return (
                <Card
                  // onClick={() => events.onClick({ id: data.id, logo: data.logo })}
                  key={index}
                  // onClick={service_clicked}
                  hoverable
                  className="w-full .min-h-[150px] bg-[#ebf3f5]  border border-[#0F285F] border-opacity-30 "
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
                        Үйлчилгээний төлөв:{" "}
                        <span className="font-bold">{item?.status}</span>
                      </div>
                      <div className=".font-bold">
                        Үйлчилгээний нэр:{" "}
                        <span className="font-bold">{item?.serviceName}</span>
                      </div>
                      <div className=".text-[12px] mt-1">
                        Үнэ: <span className="font-bold">{item?.price}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}
