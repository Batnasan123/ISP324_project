import Image from "next/image";
import Features from "../features/index";
import Banner from "../banner/index";
import Aboutus from "../landing/aboutus";
import Testimonials from "../landing/testimonials";

export default function Main() {
  return (
    <div className="">
      <Banner />
      <Features />
      <Aboutus />
      <Testimonials />
    </div>
  );
}
