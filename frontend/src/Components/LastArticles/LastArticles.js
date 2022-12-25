import React, { useEffect, useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "./../SectionHeader/SectionHeader";

import "./LastArticles.css";

export default function LastArticles() {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((articles) => setAllArticles(articles));
  }, []);

  return (
    <section className="articles">
      <div className="container">
        {" "}
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
        />
        <div className="articles__content">
          <div className="row">
            {allArticles.slice(0, 3).map((article, index) => (
              <ArticleBox {...article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
