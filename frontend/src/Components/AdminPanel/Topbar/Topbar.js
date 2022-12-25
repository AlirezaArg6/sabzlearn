import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isNotifsShow, setIsNotifsShow] = useState(false);

  useEffect(() => {
    const localeStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localeStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((adminProfileDetails) => {
        setAdminInfo(adminProfileDetails);
        setNotifications(adminProfileDetails.notifications);
      });
  }, [seeNotification]);

  function seeNotification(notifID) {
    const localeStorageData = JSON.parse(localStorage.getItem("user"));

    console.log(notifID);
    fetch(`http://localhost:4000/v1/notifications/see/${notifID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localeStorageData.token}`,
      },
    }).then((res) => console.log(res));
  }

  return (
    <div class="container-fluid">
      <div class="container">
        <div
          class={`home-header ${isNotifsShow && "active-modal-notfication"}`}
        >
          <div class="home-right">
            <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div>
            <div
              class="home-notification"
              onMouseEnter={() => {
                setIsNotifsShow(true);
              }}
            >
              <button type="button">
                <i class="far fa-bell"></i>
                <span class="notifications-count">{notifications.length}</span>
              </button>
            </div>
            <div
              class="home-notification-modal"
              onMouseLeave={() => {
                setIsNotifsShow(false);
              }}
            >
              <ul class="home-notification-modal-list">
                {notifications.length === 0 ? (
                  <li class="home-notification-modal-item">
                    نوتیفیکیشنی برای نمایش وجود ندارد.
                  </li>
                ) : (
                  <>
                    {notifications.map((notif) => (
                      <li class="home-notification-modal-item" key={notif._id}>
                        <span class="home-notification-modal-text">
                          {notif.msg}
                        </span>
                        <label
                          class="switch"
                          onClick={() => seeNotification(notif._id)}
                        >
                          <a href="javascript:void(0)">دیدم</a>
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-image">
                <a href="#">
                  <img src={adminInfo.profile} alt="" />
                </a>
              </div>
              <div class="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div class="home-profile-icon">
                <i class="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
