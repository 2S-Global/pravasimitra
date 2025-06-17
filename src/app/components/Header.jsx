'use client'
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div id="wrapper" className="wrapper">
      <div className="header">
        {/* Header Top Area */}
        <div className="header-toparea">
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-sm-8 col-12">
                <div className="header-topinfo">
                  <ul>
                    <li>
                      <a href="tel://+12022152529">
                        <i className="flaticon-phone-call" /> +1(202) 215 2529
                      </a>
                    </li>
                    <li>
                      <a href="mailto://contact@example.com">
                        <i className="flaticon-envelope" />
                        info@pravasimitra.us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5 col-sm-4 col-12">
                <div className="header-topsocial">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*// Header Top Area */}

        {/* Header Bottom Area */}
        <div className="header-bottomarea">
          <div className="container">
            <div className="header-bottominner">
              <div className="header-logo">
                <Link href="/">
                  <img
                    src="/assets/images/logo/logo-dark.png"
                    alt="logo"
                    style={{ maxWidth: "10%" }}
                  />
                </Link>
              </div>

              <nav className="tm-navigation">
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about-us">About</Link></li>
                  <li className="tm-navigation-dropdown"><Link href="/blogs">Blogs</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/contact-us">Contact</Link></li>
                  <li><Link href="/login">Login</Link></li>
                </ul>
              </nav>

              <div className="header-icons d-flex align-items-center">
                {/* Cart Icon */}
                <div className="cart-icon-wrapper position-relative me-3">
                  <Link href="/cart" className="text-dark position-relative">
                    <i className="fas fa-shopping-cart fa-lg"></i>
                    <span className="cart-count badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                      2
                    </span>
                  </Link>
                </div>

                {/* User Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-light border-0 dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="userMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ background: 'transparent' }}
                  >
                    <img
                      src="/assets/user.jpg"
                      alt="User"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                    <li><Link className="dropdown-item" href="/user/dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" href="/user/my-account">Profile</Link></li>
                    <li><Link className="dropdown-item" href="/buy-sell/buysell-category">Buy/Sell</Link></li>
                    <li><Link className="dropdown-item" href="/rent-lease/rentlease-category">Rent & Lease</Link></li>
                    <li><Link className="dropdown-item" href="/marketplace/marketplace-category">MarketPlace</Link></li>
                    <li><Link className="dropdown-item" href="/user/orders">Orders</Link></li>
                    <li><Link className="dropdown-item" href="/user/buy-sell/list">Manage Buy/Sell</Link></li>
                    <li><Link className="dropdown-item" href="/user/rent-lease/list">Manage Rent/Lease</Link></li>
                    <li><Link className="dropdown-item" href="/user/marketplace/list">Manage MarketPlace</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item text-danger" href="/logout">Logout</Link></li>
                  </ul>
                </div>
              </div>

              <div className="header-searchbox">
                <div className="header-searchinner">
                  <form action="#" className="header-searchform">
                    <input type="text" placeholder="Enter search keyword.." />
                  </form>
                  <button className="search-close">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>

            <div className="header-mobilemenu clearfix">
              <div className="tm-mobilenav" />
            </div>
          </div>
        </div>
        {/*// Header Bottom Area */}
      </div>
    </div>
  )
}

export default Header
