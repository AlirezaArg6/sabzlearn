import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Editor from "../../../Components/Form/Editor";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "./../../../validators/rules";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllArticles();
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => setCategories(allCategories));
  }, []);

  function getAllArticles() {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => setArticles(allArticles));
  }

  const removeArticle = (articleID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از حذف این مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف مقاله با موفقیت صورت گرفت",
              icon: "success",
              buttons: "حله",
            }).then((result) => getAllArticles());
          }
        });
      }
    });
  };

  const createNewArticle = (e) => {
    e.preventDefault();

    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    if (
      !formState.isFormValid ||
      articleCategory === "-1" ||
      JSON.stringify(articleCover) === "{}" ||
      articleBody.trim().length === 0
    ) {
      swal({
        title: "پر کردن تمامی فیلد ها اجباری می باشد",
        icon: "error",
        buttons: "دوباره امتحان کن",
      });
    } else {
    }
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
          getAllArticles();
        });
      }
    });
  };

  const newArticleAsDraft = (e) => {
    e.preventDefault();

    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    if (
      !formState.isFormValid ||
      articleCategory === "-1" ||
      JSON.stringify(articleCover) === "{}" ||
      articleBody.trim().length === 0
    ) {
      swal({
        title: "پر کردن تمامی فیلد ها اجباری می باشد",
        icon: "error",
        buttons: "دوباره امتحان کن",
      });
    } else {
    }
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
          getAllArticles();
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
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
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

                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
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
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>

                  {categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
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
                    onClick={(e) => createNewArticle(e)}
                  />
                  <input
                    type="submit"
                    className="m-1"
                    value="پیش نویس"
                    onClick={(e) => newArticleAsDraft(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="مقاله‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>مشاهده</th>

              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>{article.publish === 1 ? "منتشر شده" : "پیش نویس"}</td>
                <td>
                  {article.publish === 1 ? (
                    <i className="fa fa-check"></i>
                  ) : (
                    <Link
                      to={`draft/${article.shortName}`}
                      type="button"
                      class="btn btn-primary edit-btn"
                    >
                      ادامه نوشتن
                    </Link>
                  )}
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeArticle(article._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
