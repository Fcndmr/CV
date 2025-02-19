import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
        id="sideNav"
      >
        <Link className="navbar-brand js-scroll-trigger" to="/">
          <span className="d-block d-lg-none">Clarence Taylor</span>
          <span className="d-none d-lg-block">
            <img
              className="img-fluid img-profile rounded-circle mx-auto mb-2"
              src="../../../public/img/profile.jpg"
              alt="..."
            />
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/experience">
                Experience
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/education">
                Education
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/skills">
                Skills
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/interests">
                Interests
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link js-scroll-trigger" to="/awards">
                Awards
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
