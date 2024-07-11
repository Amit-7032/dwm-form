import { NavLink } from "react-router-dom";
import plantOverviewSvg from "../../assets/icons/plantOverview.svg";
import centraldashboardSvg from "../../assets/icons/centraldashboard.svg";
import dwmMetricsSvg from "../../assets/icons/dwm-Metrics.svg";
import availabilitySvg from "../../assets/icons/availability.svg";
import performanceSvg from "../../assets/icons/performance.svg";
import qualitySvg from "../../assets/icons/quality.svg";
import alertsSvg from "../../assets/icons/alerts.svg";
import rightArrowSvg from "../../assets/icons/right-arrow.svg";
import logOutSvg from "../../assets/icons/log-Out.svg";
import "../../styles/sidebar.css";

function SideBar() {
  const sidebarLinks = [
    { to: "/plant-overview", text: "Plant Overview", imgSrc: plantOverviewSvg },
    {
      to: "/central-dashboard",
      text: "Central Dashboard",
      imgSrc: centraldashboardSvg,
    },
    { to: "/dwm-metrics", text: "DWM Metrics", imgSrc: dwmMetricsSvg },
    { to: "/availability", text: "Availability", imgSrc: availabilitySvg },
    { to: "/performance", text: "Performance", imgSrc: performanceSvg },
    { to: "/quality", text: "Quality", imgSrc: qualitySvg },
    { to: "/alerts", text: "Alerts", imgSrc: alertsSvg },
  ];

  return (
    <div className="sidebar-container px-4" id="sidebar">
      <h1 className="m-0 sidebar-header text-center">Logo</h1>
      <div className="divider-line my-3"></div>
      <ul className="sidebar-links pl-0 ">
        {sidebarLinks?.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link-active d-block py-2"
                  : "sidebar-link d-block py-2"
              }
            >
              <span className="fw-bolder ">
                <img src={link.imgSrc} alt="" className="mr-2" />
                {link.text}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="divider-line my-3"></div>
      <ul className="sidebar-links pl-0">
        <li>
          <NavLink
            to="/leakage-form"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link-active d-block py-2"
                : "sidebar-link d-block py-2"
            }
          >
            <span className="fw-bolder sidebar-links-title">
              <img src={rightArrowSvg} alt="" className="mr-2" />
              Leakage Form
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leakage-form"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link-active d-block py-2"
                : "sidebar-link d-block py-2"
            }
          >
            <span className="fw-bolder sidebar-links-title">
              <img src={rightArrowSvg} alt="" className="mr-2" />
              DWM Form
            </span>
          </NavLink>
        </li>
      </ul>
      <div className="divider-line my-3"></div>
      <ul className="sidebar-links pl-0">
        <li>
          <NavLink
            to="/leakage-form"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link-active d-block py-2"
                : "sidebar-link d-block py-2"
            }
          >
            <span className="fw-bolder sidebar-links-title">
              <img src={rightArrowSvg} alt="" className="mr-2" />
              Work order
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leakage-form"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link-active d-block py-2"
                : "sidebar-link d-block py-2"
            }
          >
            <span className="fw-bolder sidebar-links-title">
              <img src={rightArrowSvg} alt="" className="mr-2" />
              Track work order
            </span>
          </NavLink>
        </li>
      </ul>
      <div className="divider-line my-3"></div>
      <ul className="sidebar-links pl-0">
        <li>
          <NavLink
            to="/leakage-form"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link-active d-block py-2"
                : "sidebar-link d-block py-2"
            }
          >
            <span className="fw-bolder sidebar-links-title">
              <img src={rightArrowSvg} alt="" className="mr-2" />
              Machine Comparison
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leakage-form"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link-active d-block py-2"
                : "sidebar-link d-block py-2"
            }
          >
            <span className="fw-bolder sidebar-links-title">
              <img src={rightArrowSvg} alt="" className="mr-2" />
              Machine Management
            </span>
          </NavLink>
        </li>
      </ul>
      <ul className="sidebar-links sidebar-logout-btn pl-0">
        <li>
          <NavLink to="/">
            <span className="fw-bolder sidebar-links-title">
              <img src={logOutSvg} alt="" className="mr-2" />
              Log Out
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
