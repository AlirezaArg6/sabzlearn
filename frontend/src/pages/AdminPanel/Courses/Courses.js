import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "../../../hooks/useForm";
import Input from "../../../Components/Form/Input";
import { maxValidator, minValidator } from "./../../../validators/rules";

import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("-1");
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState("presell");
  const [courseCover, setCourseCover] = useState("");

  const [formState, onInputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      description: { value: "", isValid: false },
      shortName: { value: "", isValid: false },
      price: { value: "", isValid: false },
      support: { value: "", isValid: false },
    },
    false
  );

  useEffect(() => {
    getAllCourses();

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  function getAllCourses() {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses);
      });
  }

  const removeCourse = (courseID) => {
    const localeStorageData = JSON.parse(localStorage.getItem("user"));

    console.log(courseID);
    swal({
      title: "آیا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localeStorageData.token}` },
        }).then((res) => {
          if (res.ok) {
            res.json();
            swal({
              title: "دوره ی مدنظر با موفقیت حذف شد",
              icon: "success",
              buttons: "حله",
            }).then((res) => getAllCourses());
          } else {
            swal({
              title: "حذف دوره موفقیت آمیر نبود",
              icon: "error",
              buttons: "دوباره امتحان کن",
            });
          }
        });
      }
    });
  };

  const categoryChangeHandler = (e) => {
    setCourseCategory(e.target.value);
  };

  const createNewCourse = (e) => {
    e.preventDefault();
    if (!formState.isFormValid) {
      swal({
        title: "لطفا اطلاعات وارد شده را مجددا بررسی کنید",
        icon: "warning",
        buttons: "اوکی",
      });
    } else if (courseCategory === "-1") {
      swal({
        title: "لطفا یک دسته بندی را انتخاب کنید",
        icon: "warning",
        buttons: "اوکی",
      });
    } else if (!Boolean(courseCover)) {
      swal({
        title: "لطفا یک عکس  را انتخاب کنید",
        icon: "warning",
        buttons: "اوکی",
      });
    } else {
      const localeStorageData = JSON.parse(localStorage.getItem("user"));

      let formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("support", formState.inputs.support.value);
      formData.append("shortName", formState.inputs.shortName.value);
      formData.append("categoryID", courseCategory);
      formData.append("status", courseStatus);
      formData.append("cover", courseCover);

      fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localeStorageData.token}` },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          res.json();
          swal({
            title: "دوره با موفقیت ایجاد شد",
            icon: "success",
            buttons: "حله",
          }).then((result) => getAllCourses());
        }
      });
    }
  };

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                <Input
                  element="input"
                  id="name"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5), maxValidator(50)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">توضیحات دوره</label>
                <Input
                  element="input"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(1), maxValidator(20)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">اسم کوتاه دوره</label>
                <Input
                  element="input"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(1), maxValidator(30)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا اسم کوتاه دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">پشتیبانی دوره</label>
                <Input
                  element="input"
                  id="support"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(1), maxValidator(30)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا پشتیبانی دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                <Input
                  element="input"
                  id="price"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(1), maxValidator(30)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6 mt-5">
              <div className="number input">
                <label className="input-title ms-4">دسته‌بندی دوره</label>
                <select onChange={categoryChangeHandler}>
                  <option value={"-1"}>دسته بندی مدنظر را انتخاب کنید</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setCourseCover(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="col-6">
                  <div className="presell">
                    <label className="input-title">وضعیت دوره</label>
                    <div className="radios">
                      <div className="presell-true">
                        <label>
                          <span>پیش فروش</span>
                          <input
                            type="radio"
                            value="presell"
                            name="presell"
                            defaultChecked
                            onInput={(e) => setCourseStatus(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="presell-false">
                        <label>
                          <span>در حال برگزاری</span>
                          <input
                            type="radio"
                            value="start"
                            name="presell"
                            onInput={(e) => setCourseStatus(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={(e) => createNewCourse(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0
                    ? "رایگان"
                    : `${course.price.toLocaleString()} تومان`}
                </td>
                <td>
                  {" "}
                  {course.status === "start" ? "در حال برگزاری" : "پیش فروش"}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeCourse(course._id)}
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
