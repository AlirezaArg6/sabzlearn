import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../../validators/rules";
import { useForm } from "../../../hooks/useForm";
import swal from "sweetalert";

import "./Categories.css";

export default function Category() {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }

  const editCategoryTitle = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "نام دلخواه جدیدتان را وارد کنید",
      content: "input",
      buttons: "تایید",
    }).then((res) => {
      if (res.trim().length) {
        const newCategoryTitle = {
          title: res,
        };
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageData.token}`,
          },
          body: JSON.stringify(newCategoryTitle),
        })
          .then((res) => res.json())
          .then((result) => getAllCategories());
      }
    });
  };

  const removeCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "آیا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData.token}` },
        }).then((res) => {
          if (res.ok) {
            if (res.ok) {
              res.json();
              swal({
                title: "دسته بندی مدنظر با موفقیت حذف شد",
                icon: "success",
                buttons: "حله",
              }).then((res) => getAllCategories());
            } else {
              swal({
                title: "حذف دوره دسته بندی آمیر نبود",
                icon: "error",
                buttons: "دوباره امتحان کن",
              });
            }
          }
        });
      }
    });

    //   fetch(`http://localhost:4000/v1/category/${categoryID}`, {
    //     method: "DELETE",
    //     headers: { Authorization: `Bearer ${localStorageData.token}` },
    //   }).then((res) => {
    //     if (res.ok) {
    //       if (res.ok) {
    //         res.json();
    //         swal({
    //           title: "دسته بندی مدنظر با موفقیت حذف شد",
    //           icon: "success",
    //           buttons: "حله",
    //         }).then((res) => getAllCategories());
    //       } else {
    //         swal({
    //           title: "حذف دوره دسته بندی آمیر نبود",
    //           icon: "error",
    //           buttons: "دوباره امتحان کن",
    //         });
    //       }
    //     }
    //   });
    // };}
  };

  const createNewCategory = (e) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    e.preventDefault();
    if (formState.isFormValid) {
      const newCategotyInfo = {
        title: formState.inputs.title.value,
        name: formState.inputs.shortname.value,
      };
      fetch(`http://localhost:4000/v1/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify(newCategotyInfo),
      }).then((res) => {
        if (res.ok) {
          res.json();
          swal({
            title: "دسته بندی مورد نظر با موفقیت ایجاد شد ",
            icon: "success",
            buttons: "حله",
          }).then((result) => getAllCategories());
        }
      });
    } else {
      swal({
        title: "خطایی رخ داده است",
        icon: "error",
        buttons: "دوباره امتحان کن",
      });
    }
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دسته‌بندی‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => editCategoryTitle(category._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCategory(category._id)}
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
