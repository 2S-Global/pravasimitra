// app/login/page.js
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import OtherBanner from '@/app/components/OtherBanner';
import Link from 'next/link';

export const metadata = {
  title: 'Register | Pravasi Mitra',
  description: 'Login to your account securely using your mobile number and password.',
  keywords: ['login', 'account', 'user', 'authentication'],
  openGraph: {
    title: 'Register - Pravasi Mitra',
    description: 'Access your account through a secure login page.',
    type: 'website',
  },
};

const Register = () => {
  return (
    <>
      <Header />
      <OtherBanner page_title="Register Now" />

      <main className="main-content">
        <div className="tm-section tm-login-register-area bg-white tm-padding-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-6">
                <form method="post" action="/api/login" className="tm-form tm-login-form tm-form-bordered">
                  <h4>Register Now</h4>
                  <div className="tm-form-inner">

                  <div className="tm-form-field">
                  <label htmlFor="login-email">Name*</label>
                  <input type="text" name="username" id="login-email" required />
                  </div>

                   <div className="tm-form-field">
                  <label htmlFor="login-email">Email*</label>
                  <input type="text" name="username" id="login-email" required />
                  </div>
                    <div className="tm-form-field">
                      <label htmlFor="login-email">Mobile*</label>
                      <input type="text" name="username" id="login-email" required />
                    </div>
                    <div className="tm-form-field">
                      <label htmlFor="login-password">Password*</label>
                      <input type="password" name="password" id="login-password" required />
                    </div>
                    <div className="tm-form-field">
                      <input type="checkbox" name="login-remember" id="login-remember" />
                      <label htmlFor="login-remember">Remember Me</label>
                    </div>
                    <div className="tm-form-field">
                      <button type="submit" name="login" className="tm-button">
                        Login
                      </button>
                    </div>
                    <div className="tm-form-field">
                      <Link href="/login">Returning User Login</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Register;
