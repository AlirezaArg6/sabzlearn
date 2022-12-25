import React, { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfosContext from "../../context/infosContext";

import "./Topbar.css";

export default memo(function Topbar({ info }) {
  const [allTopbarMenus, setAllTopbarMenus] = useState([]);
  const indexInfos = useContext(InfosContext);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
      .then((res) => res.json())
      .then((datas) => setAllTopbarMenus(datas));
  }, []);

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {[...allTopbarMenus]
                .sort(() => Math.random() - 0.5)
                .slice(0, 5)
                .map((menu, index) => (
                  <li className="top-bar__item" key={index}>
                    <Link to={menu.href} className="top-bar__link">
                      {menu.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                {indexInfos.email}
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                {indexInfos.phone}
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
