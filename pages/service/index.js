// system import
import React, { useEffect } from "react";
import { useRouter } from "next/router";

// global state
import useService from "../../hooks/useService";
// import useAuth from "../hooks/useAuth";

// design components
import MainLayout from "../../layouts/main";
import DataDisplayer from "../../components/displayer";
import Cards from "../../components/card/Card";
import Head from "next/head";

const render = ({ data, events }) => {
  console.log("data services", data);
  const dataDetails = [...data];
  return (
    <div className="min-h-screen min-[350px]:px-12">
      <Head>
        <title>ӨРӨӨНҮҮД</title>
      </Head>
      <div className="my-5 font-bold"></div>
      <div className="grid .place-items-center gap-3 font-Montserrat sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dataDetails.length > 0 &&
          dataDetails.map((item, index) => {
            return (
              <a href={`/rooms/${item?.id}`} target="_blank">
                <Cards
                  key={index}
                  data={{
                    id: item?.id,
                    key: index,
                    status: item?.status,
                    serviceName: item?.serviceName,
                    price: item?.price,
                  }}
                  events={{
                    onClick: events.handleClick,
                  }}
                />
              </a>
            );
          })}
      </div>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const service = useService();
  //   const data = {
  //     success: true,
  //     data: [
  //       { id: "1", roomName: "room 301", price: "150,000$" },
  //       { id: "2", roomName: "room 302", price: "120,000$" },
  //       { id: "3", roomName: "room 303", price: "110,000$" },
  //       { id: "4", roomName: "room 304", price: "80,000$" },
  //     ],
  //   };
  useEffect(() => {
    service.loadAllServices();
  }, []);

  const handleOnClick = (value) => {
    // console.log("clicked");
    // auth.setLoggedInservice(value.id);
    // service.SetLogo(value.logo);
    // auth?.eventFun();
    // router.push("/auth/login");
  };
  return (
    <React.Fragment>
      <h1
        className="mb-2 pt-4"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Үйлчилгээнүүд
      </h1>
      <DataDisplayer
        error={service?.state?.message}
        status={service?.state?.status}
        data={service?.state?.list}
        render={render}
        // tr={t}
        events={{
          handleClick: handleOnClick,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
