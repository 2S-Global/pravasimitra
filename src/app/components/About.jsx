"use client";

import Link from "next/link";
import { Box, Button, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";

// const sliderImages = [
//   "/assets/images/others/about_image1.jpg",
//   "/assets/images/others/about_image2.jpg",
//   "/assets/images/others/about_image3.jpg",
//   "/assets/images/others/about_image4.jpg",
// ];

const HomeAbout = () => {
  const [current, setCurrent] = useState(0);

  // Auto play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <>
      <div className="tm-section about-us-area bg-white tm-padding-section">
        <div className="container">
          <div className="row">
            {/* Left Text Content */}
            <div className="col-lg-12 order-2 order-lg-1">
              <div className="about-content">
                <h2>About Pravasi Mitra</h2>
                <p style={{ textAlign: "justify" }}>
                  At Pravasi Mitra, we understand the unique journey and diverse
                  needs of individuals living and working away from their home
                  country. Our core purpose is to simplify and enrich the lives
                  of migrants by providing a dedicated, comprehensive platform
                  that connects them to essential services and a vibrant,
                  supportive community. Pravasi Mitra is a pioneering website
                  and mobile application designed to be your trusted companion,
                  bridging the distance between you and your homeland, and
                  empowering you to thrive wherever you are. We recognize that
                  being away from home brings its own set of challenges, and our
                  platform is meticulously developed to address these with
                  efficiency and care.
                </p>

                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  What We Offer:
                </p>

                <p>
                  Pravasi Mitra is your all-in-one hub for seamless living
                  abroad. Our integrated services include:
                </p>
                <p>
                  <ul>
                    <li style={{ textAlign: "justify" }}>
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        • Remittance Services:
                      </span>{" "}
                      Facilitating secure, transparent, and efficient money
                      transfers to ensure your hard-earned money reaches your
                      loved ones back home with ease and peace of mind.
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        • Buy/Sell & Marketplace:
                      </span>{" "}
                      A dynamic and reliable platform for buying, selling, and
                      trading goods and services within the migrant community,
                      fostering local commerce and helping you find exactly what
                      you need or sell what you no longer require.
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        • Rent/Lease:
                      </span>{" "}
                      A dedicated section to help you find suitable
                      accommodation or list your property for rent or lease
                      within the migrant community, making transitions smoother
                      and more convenient.
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                        • Inter-Community Services: :
                      </span>{" "}
                      A wide array of features designed to strengthen community
                      bonds, including event listings, local groups, information
                      sharing, and shared resources to help you settle in,
                      connect, and thrive.
                    </li>
                  </ul>
                </p>

                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Our Commitment:
                </p>

                <p>
                  We are committed to building a reliable, user-friendly, and
                  secure platform that evolves with the needs of the global
                  migrant community. Pravasi Mitra aims to foster a sense of
                  belonging, providing practical solutions and facilitating
                  meaningful connections that make life away from home feel a
                  little closer to home.
                </p>
                <p style={{ fontWeight: "bold", textAlign: "justify" }}>
                  Join the Pravasi Mitra community today and experience the
                  difference of having a true "friend" (Mitra) by your side,
                  supporting your journey every step of the way.
                </p>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {" "}
                  Our Vision:
                </p>
                <p>
                  To build a global network of empowered and connected migrants,
                  fostering a sense of belonging, security, and prosperity for
                  everyone living away from their homeland.
                </p>
                <p style={{ fontWeight: "bold", textAlign: "justify" }}>
                  Join the Pravasi Mitra community today and experience the
                  difference of having a true "friend" (Mitra) by your side,
                  wherever your journey takes you.
                </p>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {" "}
                  Vision & Mission:
                </p>
                <p>
                    <ul>
                        <li><span style={{ fontWeight:"bold",display:"block",marginBottom:"1px" }}>• Vision:</span>
                              <span style={{marginLeft:"25px" }}>To build a global network of empowered and connected migrants, fostering a sense of belonging, security, and prosperity for everyone living away from their homeland.</span>
                        </li>

                         <li><span style={{ fontWeight:"bold",display:"block",marginBottom:"1px" }}>• Mission:</span>
                              <span style={{marginLeft:"25px" }}>To be the indispensable companion for every migrant, providing a comprehensive and supportive ecosystem that bridges distances and simplifies life abroad through a pioneering website and mobile application.</span>
                        </li>
                    </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAbout;
