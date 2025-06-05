
import Link from "next/link"
const HomeAbout = () =>{

    return(

        <>
  {/*// Features Area */}
  {/* About Us */}
  {/*// About Us */}
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
            <ul className="stylish-list">
              <li>
                <i className="far fa-check-square" />
                Consular Services: Offering expert assistance with consular
                processes and documentation.
              </li>
              <li>
                <i className="far fa-check-square" />
                Remittance Services: Secure and efficient transfer of funds
                internationally.
              </li>
              <li>
                <i className="far fa-check-square" />
                Buy/Sell Services: Facilitating smooth and reliable transactions
                for buying and selling.
              </li>
              <li>
                <i className="far fa-check-square" />
                Jobs: Connecting top talent with employers to fulfill staffing
                needs.
              </li>
            </ul>
            <Link href="/about-us" className="tm-button">
              About Us <b />
            </Link>
          </div>
        </div>
        {/*     <style>
		.tm-service2-icon{
		color: white;
		}
		</style> */}
<div className="col-lg-5 order-1 order-lg-2 offset-1 slider-new">
  <div className="single-image-wrapper text-center">
    <img
      src="assets/images/others/about_image1.jpg"
      alt="About"
      style={{ width: "100%", height: "auto", maxHeight: 400, objectFit: "cover", borderRadius: "10px" }}
    />
  </div>
</div>

      </div>
    </div>
  </div>
</>


    )
}

export default HomeAbout