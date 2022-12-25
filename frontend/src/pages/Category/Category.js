import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router-dom";

import "./Category.css";

export default function Category() {
  const [allCourses, setAllCourses] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownItems, setShownItems] = useState([]);
  const [status, setStatus] = useState("default");
  const [statusTitle, setStatusTitle] = useState(" مرتب سازی پیش فرض");
  const [searchValue, setSearchValue] = useState("");
  const [coursesDisplayType, setCoursesDisplayType] = useState("row");

  const { categoryName } = useParams();

  useEffect(() => {
    console.log(`http://localhost:4000/v1/courses/category/${categoryName}`);
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((courses) => {
        setAllCourses(courses);
        setOrderedCourses(courses);
      });
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        setOrderedCourses(allCourses.filter((course) => course.price === 0));
        break;
      }
      case "paid": {
        setOrderedCourses(allCourses.filter((course) => course.price !== 0));
        break;
      }
      case "first": {
        setOrderedCourses(allCourses);
        break;
      }
      case "last": {
        setOrderedCourses(allCourses.slice().reverse());
        break;
      }
      case "cheap": {
        setOrderedCourses(allCourses.slice().sort((a, b) => a.price - b.price));
        break;
      }
      case "expensive": {
        setOrderedCourses(allCourses.slice().sort((a, b) => b.price - a.price));
        break;
      }
      default: {
        setOrderedCourses(allCourses);
      }
    }
  }, [status, allCourses]);

  const searchValueChangeHandler = (e) => {
    setSearchValue(e.target.value);
    // const courses = [...allCourses];
    const filteredCourses = allCourses.filter((course) =>
      course.name.includes(e.target.value)
    );
    setOrderedCourses(filteredCourses);
  };

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div
                className={`courses-top-bar__row-btn ${
                  coursesDisplayType === "row"
                    ? "courses-top-bar__icon--active"
                    : ""
                }`}
                onClick={() => setCoursesDisplayType("row")}
              >
                <i className="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div
                className={`courses-top-bar__column-btn ${
                  coursesDisplayType === "column"
                    ? "courses-top-bar__icon--active"
                    : ""
                }`}
                onClick={() => setCoursesDisplayType("column")}
              >
                <i className="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  {statusTitle}{" "}
                  <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li
                    className={`courses-top-bar__selection-item  ${
                      statusTitle === "مرتب سازی پیش فرض"
                        ? "courses-top-bar__selection-item--active"
                        : ""
                    } `}
                    onClick={(e) => {
                      setStatus("default");
                      setStatusTitle(e.target.innerHTML);
                    }}
                  >
                    مرتب سازی پیش فرض
                  </li>
                  <li
                    className={`courses-top-bar__selection-item  ${
                      statusTitle === "مرتب سازی دوره های رایگان"
                        ? "courses-top-bar__selection-item--active"
                        : ""
                    } `}
                    onClick={(e) => {
                      setStatus("free");
                      setStatusTitle(e.target.innerHTML);
                    }}
                  >
                    مرتب سازی دوره های رایگان
                  </li>
                  <li
                    className={`courses-top-bar__selection-item  ${
                      statusTitle === "مرتب سازی دوره های پولی"
                        ? "courses-top-bar__selection-item--active"
                        : ""
                    } `}
                    onClick={(e) => {
                      setStatus("paid");
                      setStatusTitle(e.target.innerHTML);
                    }}
                  >
                    مرتب سازی دوره های پولی
                  </li>
                  <li
                    className={`courses-top-bar__selection-item  ${
                      statusTitle === "مرتب سازی اولین دوره های منتشر شده"
                        ? "courses-top-bar__selection-item--active"
                        : ""
                    } `}
                    onClick={(e) => {
                      setStatus("first");
                      setStatusTitle(e.target.innerHTML);
                    }}
                  >
                    مرتب سازی اولین دوره های منتشر شده
                  </li>
                  <li
                    className={`courses-top-bar__selection-item  ${
                      statusTitle === "مرتب سازی آخرین دوره های منتشر شده"
                        ? "courses-top-bar__selection-item--active"
                        : ""
                    } `}
                    onClick={(e) => {
                      setStatus("last");
                      setStatusTitle(e.target.innerHTML);
                    }}
                  >
                    مرتب سازی آخرین دوره های منتشر شده
                  </li>

                  <li
                    className={`courses-top-bar__selection-item  ${
                      statusTitle === "مرتب سازی بر اساس ارزان ترین"
                        ? "courses-top-bar__selection-item--active"
                        : ""
                    } `}
                    onClick={(e) => {
                      setStatus("cheap");
                      setStatusTitle(e.target.innerHTML);
                    }}
                  >
                    مرتب سازی بر اساس ارزان ترین
                  </li>
                  <li
                    className={`courses-top-bar__selection-item  ${
                      statusTitle === "مرتب سازی بر اساس گران ترین"
                        ? "courses-top-bar__selection-item--active"
                        : ""
                    } `}
                    onClick={(e) => {
                      setStatus("expensive");
                      setStatusTitle(e.target.innerHTML);
                    }}
                  >
                    مرتب سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                  onChange={searchValueChangeHandler}
                />
                <i className="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>
          </div>

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownItems.length === 0 ? (
                  <div className="alert alert-warning">
                    هیچ دوره‌ای برای {statusTitle} وجود ندارد
                  </div>
                ) : (
                  <>
                    {coursesDisplayType === "row" ? (
                      <>
                        {shownItems.map((course) => (
                          <CourseBox {...course} />
                        ))}
                      </>
                    ) : (
                      <>
                        {shownItems.map((course) => (
                          <div class="col-12">
                            <div class="course-box">
                              <div class="course__box-header">
                                <div class="course__box-right">
                                  <a class="course__box-right-link" href="#">
                                    <img
                                      src="/images/courses/fareelancer.png"
                                      class="course__box-right-img"
                                    />
                                  </a>
                                </div>
                                <div class="course__box-left">
                                  <div class="course__box-left-top">
                                    <a href="#" class="course__box-left-link">
                                      {course.name}
                                    </a>
                                  </div>
                                  <div class="course__box-left-center">
                                    <div class="course__box-left-teacher">
                                      <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                      <span class="course__box-left-name">
                                        محمد امین سعیدی راد
                                      </span>
                                    </div>
                                    <div class="course__box-left-stars">
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                    </div>
                                  </div>
                                  <div class="course__box-left-bottom">
                                    <div class="course__box-left-des">
                                      <p>{course.description}</p>
                                    </div>
                                  </div>
                                  <div class="course__box-footer">
                                    <div class="course__box-footer-right">
                                      <i class="course__box-footer-icon fa fa-users"></i>
                                      <span class="course__box-footer-count">
                                        202
                                      </span>
                                    </div>
                                    <span class="course__box-footer-left">
                                      {course.price === 0
                                        ? "رایگان"
                                        : course.price.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <Pagination
            setShownItems={setShownItems}
            items={orderedCourses}
            itemsCount={3}
            pathname={`/category-info/${categoryName}`}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
