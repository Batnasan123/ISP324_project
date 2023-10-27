import "../styles/globals.css";
import TopBar from "../components/topbar";
import Footer from "../components/footer";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <HelmetProvider>
        <Helmet titleTemplate="Beauty Salon" />
        <AuthProvider>
          <TopBar />
          {getLayout(<Component {...pageProps} />)}
          <Footer />
        </AuthProvider>
      </HelmetProvider>
    </>
  );
}
