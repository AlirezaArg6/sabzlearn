import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import swal from "sweetalert";

import "./Sidebar.css";

export default function Sidebar() {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const adminLogout = () => {
    swal({
      title: "با موفقیت خارج شدید",
      icon: "success",
      buttons: "برو به صفحه اصلی",
    }).then((res) => {
      authContext.logout();
      navigate("/");
    });
  };

  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="sessions">
              <span>جلسات</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="comments">
              <span>نظرات</span>
            </Link>
          </li>
          <li>
            <Link to="offs">
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to="categories">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="contact">
              <span>پیغام ها</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={adminLogout}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
