import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

import Editor from "../../../Components/Form/Editor";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";

export default function Draft() {
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleShortName, setArticleShortName] = useState("");
  const [articleDescription, setArticleDescription] = useState("");

  const { articleName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
        console.log(allCategories);
      });
    console.log(categories);

    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then((res) => res.json())
      .then((articleDetail) => {
        setArticleCategory(articleDetail.categoryID._id);
        setArticleCover(articleDetail.cover);
        setArticleBody(articleDetail.body);
        setArticleTitle(articleDetail.title);
        setArticleShortName(articleDetail.shortName);
        setArticleDescription(articleDetail.description);
      });
  }, []);

  const createNewArticle = (e) => {
    e.preventDefault();

    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", articleTitle);
    formData.append("shortName", articleShortName);
    formData.append("description", articleDescription);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:4000/v1/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت ایجاد شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          navigate("/p-admin/articles");
        });
      }
    });
  };

  const newArticleAsDraft = (e) => {
    e.preventDefault();

    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", articleTitle);
    formData.append("shortName", articleShortName);
    formData.append("description", articleDescription);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:4000/v1/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت پیش نویس شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          navigate("/p-admin/articles");
        });
      }
    });
  };
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <input
                  element="input"
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <input
                  element="input"
                  type="text"
                  value={articleShortName}
                  onChange={(e) => setArticleShortName(e.target.value)}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <textarea
                  type="text"
                  className="article-textarea p-2"
                  value={articleDescription}
                  onChange={(e) => setArticleDescription(e.target.value)}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor data={articleBody} setArticleBody={setArticleBody} />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(e) => setArticleCover(e.target.files[0])}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select onChange={(e) => setArticleCategory(e.target.value)}>
                  <option>دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option
                      value={category._id}
                      selected={category._id === articleCategory ? true : false}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input
                    type="submit"
                    className="m-1"
                    value="انتشار"
                    onClick={createNewArticle}
                  />
                  <input
                    type="submit"
                    className="m-1"
                    value="پیش نویس"
                    onClick={newArticleAsDraft}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
