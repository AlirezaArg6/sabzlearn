import React, { useContext } from "react";
import AuthContext from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Sidebar() {
  return (
    <div class="col-3">
      <div class="sidebar">
        <span class="sidebar__name">محمدامین سعیدی راد</span>
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              پیشخوان
            </a>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="orders">
              سفارش‌ها
            </Link>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              کیف پول من
            </a>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              جزئیات حساب کاربری
            </a>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="buyed">
              دوره های خریداری شده
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="send-ticket">
              تیکت های پشتیبانی
            </Link>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
