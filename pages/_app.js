import "../styles/globals.css";
// import TopBar from "../components/TopBar/topbar";
// import Footer from "../components/footer/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate="Beauty Salon" />
        {/* <TopBar />  */}
        <Component {...pageProps} />
        {/* <Footer /> */}
      </HelmetProvider>
    </>
  );
}
