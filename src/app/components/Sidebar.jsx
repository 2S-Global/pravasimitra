import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="profile-nav col-md-3">
      <div className="panel">
        <div className="user-heading round">
          <a href="#">
            <img src="https://media.istockphoto.com/id/1136413215/photo/young-man-at-street-market.jpg?s=612x612&w=0&k=20&c=obnaR5III0jRxHKd4ZPl3LRC2pI792KbHYR2eBzKKe8=" alt="Profile" />
          </a>
          <h1>Abhishek Dey</h1>
          <p>abhishek@gmail.com</p>
        </div>

        <ul className="nav nav-pills nav-stacked">
          <li className="active">
            <Link href="/user/dashboard">
              <i className="fa fa-tachometer-alt" /> Dashboard
            </Link>
          </li>

          <li>
            <Link href="/user/my-account">
              <i className="fa fa-user-cog" /> Manage Profile
            </Link>
          </li>

          <li>
            <Link href="/user/profile-image">
              <i className="fa fa-image" /> Change Profile Image
            </Link>
          </li>

          <li>
            <Link href="/user/change-password">
              <i className="fa fa-lock" /> Change Password
            </Link>
          </li>

          {/* <li>
            <Link href="#">
              <i className="fa fa-shield-alt" /> Privacy Settings
            </Link>
          </li>

          <li>
            <Link href="#">
              <i className="fa fa-user-shield" /> Two-Step Authentication
            </Link>
          </li> */}

          <li>
            <Link href="#">
              <i className="fa fa-sign-out-alt" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
