import React, { useEffect, useState } from "react";

import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [courseState, setCourseState] = useState("all");

  useEffect(() => {
    fetch(`http://localhost:4000/v1/users/courses`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setShownCourses(data);
      });
  }, []);

  const filterCourses = (courseState) => {
    switch (courseState) {
      case "all": {
        setShownCourses(courses);
        break;
      }
      case "free": {
        const filteredCourses = courses.filter(
          (course) => course.course.price === 0
        );
        setShownCourses(filteredCourses);
        break;
      }
      case "money": {
        const filteredCourses = courses.filter(
          (course) => course.course.price !== 0
        );
        setShownCourses(filteredCourses);
        break;
      }
      default: {
        setShownCourses(courses);
      }
    }
  };

  return (
    <div class="col-9">
      <div class="courses">
        <div class="courses-header__panel">
          <span class="courses-header__title">دوره های ثبت نام شده</span>
          <ul class="courses-header__list">
            <li
              class="courses-header__item"
              onClick={() => {
                setCourseState("all");
                filterCourses("all");
              }}
            >
              <a
                class={`courses-header__link__panel ${
                  courseState === "all" && "courses-header__link-active"
                }`}
                href="#"
              >
                همه دوره ها
              </a>
            </li>
            <li
              class="courses-header__item"
              onClick={() => {
                setCourseState("free");
                filterCourses("free");
              }}
            >
              <a
                class={`courses-header__link__panel ${
                  courseState === "free" && "courses-header__link-active"
                }`}
                href="#"
              >
                دوره های رایگان
              </a>
            </li>
            <li
              class="courses-header__item"
              onClick={() => {
                setCourseState("money");
                filterCourses("money");
              }}
            >
              <a
                class={`courses-header__link__panel ${
                  courseState === "money" && "courses-header__link-active"
                }`}
                href="#"
              >
                دوره های پولی
              </a>
            </li>
          </ul>
        </div>
        <div class="main">
          <div class="row">
            <div class="col-12">
              {shownCourses.map((course) => (
                <div class="main__box">
                  <div class="main__box-right">
                    <a class="main__box-img-link" href="#">
                      <img
                        class="main__box-img img-fluid"
                        src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                      />
                    </a>
                  </div>
                  <div class="main__box-left">
                    <a href="#" class="main__box-title"></a>
                    <div class="main__box-bottom">
                      <div class="main__box-all">
                        <span class="main__box-all-text">وضعیت:</span>
                        <span class="main__box-all-value">
                          {" "}
                          {course.course.isComplete === 1
                            ? "تکمیل شده"
                            : "در حال برگزاری"}
                        </span>
                      </div>
                      <div class="main__box-completed">
                        <span class="main__box-completed-text">مبلغ:</span>
                        <span class="main__box-completed-value">
                          {" "}
                          {course.course.price === 0
                            ? "رایگان"
                            : `${course.course.price.toLocaleString()} تومان`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
