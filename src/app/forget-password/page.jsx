// app/login/page.js
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import OtherBanner from '@/app/components/OtherBanner';
import Link from 'next/link';

export const metadata = {
  title: 'Forget Password | Pravasi Mitra',
  description: 'Login to your account securely using your mobile number and password.',
  keywords: ['login', 'account', 'user', 'authentication'],
  openGraph: {
    title: 'Foeget Password - Pravasi Mitra',
    description: 'Access your account through a secure login page.',
    type: 'website',
  },
};

const FoegetPassword = () => {
  return (
    <>
      <Header />
      {/* <OtherBanner page_title="Forget Password" /> */}

       <section className="vh-100" style={{ backgroundColor: "#fff" }}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="img-fluid"
                style={{ borderRadius: "1rem 0 0 1rem" }}
              />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i
                      className="fas fa-cubes fa-2x me-3"
                      style={{ color: "#ff6219" }}
                    />
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>
                  <h5
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: 1 }}
                  >
                    Reset your account
                  </h5>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg"  placeholder='Email Address'  />
                    
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-dark btn-lg btn-block"
                      type="button"
                    >
                      Login
                    </button>
                  </div>
                  <a className="small text-muted" href="/forget-password">
                    Forgot password?
                  </a>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?{" "}
                    <a href="/register" style={{ color: "#393f81" }}>
                      Register here
                    </a>
                  </p>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </>
  );
};

export default FoegetPassword;
