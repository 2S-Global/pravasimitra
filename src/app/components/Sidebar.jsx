import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="profile-nav col-md-3">
      <div className="panel">
        <div className="user-heading round">
          <a href="#">
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Profile" />
          </a>
          <h1>Camila Smith</h1>
          <p>deydey@theEmail.com</p>
        </div>

        <ul className="nav nav-pills nav-stacked">
          <li className="active">
            <Link href="/dashboard">
              <i className="fa fa-tachometer-alt" /> Dashboard
            </Link>
          </li>

          <li>
            <Link href="/my-account">
              <i className="fa fa-user-cog" /> Manage Profile
            </Link>
          </li>

          <li>
            <Link href="#">
              <i className="fa fa-image" /> Change Profile Image
            </Link>
          </li>

          <li>
            <Link href="#">
              <i className="fa fa-lock" /> Change Password
            </Link>
          </li>

          <li>
            <Link href="#">
              <i className="fa fa-shield-alt" /> Privacy Settings
            </Link>
          </li>

          <li>
            <Link href="#">
              <i className="fa fa-user-shield" /> Two-Step Authentication
            </Link>
          </li>

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
