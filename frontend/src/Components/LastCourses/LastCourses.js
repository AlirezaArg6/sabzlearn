import React, { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastCourses.css";

export default function LastCourses() {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((courses) => setAllCourses(courses));
  }, []);

  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="courses/1"
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {[...allCourses].slice(0, 3).map((course, index) => (
                  <CourseBox {...course} key={index + 1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
