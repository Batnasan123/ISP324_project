import Image from "next/image";
import Features from "../features/index";
import Banner from "../banner/index";
import Aboutus from "../landing/aboutus";
import Testimonials from "../landing/testimonials";
import Artist from "../Artist/index";

export default function Main() {
  return (
    <div className="">
      <Banner />
      <Features />
      <Aboutus />
      <Testimonials />
      <Artist />
    </div>
  );
}
