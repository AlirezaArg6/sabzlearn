import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import Topbar from "../../Components/Topbar/Topbar";

export default function Search() {
  const [courses, setCourse] = useState([]);
  const [articles, setArticles] = useState([]);

  const { searchValue } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${searchValue}`)
      .then((res) => res.json())
      .then((datas) => {
        setArticles(datas.allResultArticles);
        setCourse(datas.allResultCourses);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="دوره های جستجو شده"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length === 0 ? (
                  <div className="alert alert-warning mt-4">
                    دوره ای برای نمایش وجود ندارد
                  </div>
                ) : (
                  <>
                    {courses.map((course) => (
                      <CourseBox {...course} key={course._id} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="articles">
        <div className="container">
          {" "}
          <SectionHeader
            title="مقاله های های جستجو شده"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="articles__content">
            <div className="row">
              {articles.length === 0 ? (
                <div className="alert alert-warning mt-4">
                  مقاله ای برای نمایش وجود ندارد
                </div>
              ) : (
                <>
                  {articles.map((article) => (
                    <ArticleBox {...article} key={article._id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
