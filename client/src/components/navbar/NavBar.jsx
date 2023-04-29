import React, { useContext } from "react";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { Link } from "react-router-dom";
import Person from "../../images/person.png";
import { ToggleContext } from "../../context/ToggleTheme";

const NavBar = () => {
  const { toggler, darkMode } = useContext(ToggleContext);
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <span>lamasocial</span>
        </Link>
        <HomeOutlinedIcon className="pointer" />
        {darkMode ? (
          <WbSunnyOutlinedIcon className="pointer" onClick={toggler} />
        ) : (
          <DarkModeOutlinedIcon className="pointer" onClick={toggler} />
        )}
        <GridViewOutlinedIcon className="pointer" />
        <div className="search">
          <input type="text" name="search" placeholder="Search ..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon className="pointer" />
        <EmailOutlinedIcon className="pointer" />
        <NotificationsOutlinedIcon className="pointer" />
        <div className="user">
          <img src={Person} alt="person" />
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
