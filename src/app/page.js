import Image from "next/image";


import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import Services from "./components/Services";
import HomeAbout from "./components/HomeAbout";
import Blogs from "./components/Blogs";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
  <Header />
  <HeroBanner />
  <Services />
  <HomeAbout />
  <Testimonials />
  <Blogs />
  <Footer />
    </>

  );
}
