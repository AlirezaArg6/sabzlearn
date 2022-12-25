import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";

import "./Courses.css";
import { useParams } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";

export default function Courses() {
  const [allCourses, setAllCourses] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [shownItems, setShownItems] = useState([]);

  const { page } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((courses) => setAllCourses(courses));
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownItems.map((course, index) => (
                  <CourseBox {...course} key={index + 1} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={allCourses}
            itemsCount={3}
            pathname="/courses"
            setShownItems={setShownItems}
          />
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  );
}
