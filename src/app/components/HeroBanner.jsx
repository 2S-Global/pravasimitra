
const HeroBanner = () =>{

return(

<div className="heroslider-area">
  {/* Heroslider Slider */}
  <div className="heroslider-slider tm-slider-dots tm-slider-dots-left">
    <div
      className="heroslider-singleslider"
      data-bgimage="assets/images/heroslider/heroslider-image-1.jpg"
    />
    <div
      className="heroslider-singleslider"
      data-bgimage="assets/images/heroslider/heroslider-image-2.jpg"
    />
    <div
      className="heroslider-singleslider"
      data-bgimage="assets/images/heroslider/heroslider-image-3.jpg"
    />
  </div>
  {/*// Heroslider Slider */}
  {/* Heroslider Content */}
  <div className="heroslider-contentwrapper">
    <div className="heroslider-overlay2" />
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-md-8">
          <div className="heroslider-content">
            <h1
              className="wow fadeInUp tm-animated-text"
              data-in-effect="rollIn"
              data-out-effect="fadeOutDown"
              data-out-shuffle="true"
              data-wow-delay="0.5s"
            >
              We are Providing Best Business Service
            </h1>
            <p className="wow fadeInUp" data-wow-delay="0.7s">
              Business plan draws on a wide range of knowledge from many
              different business disciplines
            </p>
            <a
              href="about-us.html"
              className="tm-button wow fadeInUp"
              data-wow-delay="0.9s"
            >
              About Us
              <b />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*// Heroslider Content */}
</div>


)

}

export default HeroBanner;