'use client'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useState } from "react";


const BlogDetails = ({param}) =>{

const {id}=param;

const [blogDetails, setblogDetails]=useState(null)


    return(
<>
<Header />
<OtherBanner page_title="About Us" />


<div className="tm-section about-us-area bg-white tm-padding-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 order-2 order-lg-1">
          <div className="about-content">
            <h2>Welcome to our company</h2>
            {/* <h6>Lorem ipsum dolor sit amet consectetur adipisicing elitsed do eiusmod ncididunt ametfh consectetur.</h6> */}
            <p style={{ textAlign: "justify" }}>
              PravasiMitra specializes in consular services, remittance
              solutions, and buy/sell transactions, providing trusted expertise
              and efficient service delivery. We ensure seamless processes and
              client satisfaction, making us your preferred partner for all your
              service needs.
            </p>
            
          </div>
        </div>
        {/*     <style>
		.tm-service2-icon{
		color: white;
		}
		</style> */}
        <div className="col-lg-5 order-1 order-lg-2 offset-1 slider-new">

        </div>
      </div>
    </div>
  </div>




<Footer />
</>

    )

}

export default BlogDetails