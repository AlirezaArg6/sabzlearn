import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";

export default function Offs() {
  const [offs, setOffs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offCourse, setOffCourse] = useState("");

  const [formState, onInputHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllOffs();
    getAllCourses();
  }, []);

  function getAllOffs() {
    fetch(`http://localhost:4000/v1/offs`)
      .then((res) => res.json())
      .then((allOffs) => setOffs(allOffs));
  }

  function getAllCourses() {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }

  const createOff = (e) => {
    e.preventDefault();
    const newOffInfo = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      max: formState.inputs.max.value,
      course: offCourse,
    };

    if (formState.isFormValid && offCourse) {
      fetch(`http://localhost:4000/v1/offs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify(newOffInfo),
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "ثبت کد تخفیف با موفقیت انجام شد",
            icon: "success",
            buttons: "حله",
          }).then((res) => getAllOffs());
        } else {
          swal({
            title: "فیلد های وروری را مجددا چک کنید",
            icon: "warning",
            buttons: "اوکی",
          });
        }
      });
    } else {
      swal({
        title: "تمامی فیلد ها باید تعیین شوند",
        icon: "warning",
        buttons: "دوباره امتحان کن",
      });
    }
  };

  const removeOff = (offID) => {
    swal({
      title: "آیا از حذف مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/offs/${offID}`, {
          method: "Delete",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کد تخفیف با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then((res) => getAllOffs());
          }
        });
      }
    });
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن کد تخفیف جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title"> عنوان کد</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="code"
                  validations={[minValidator(1)]}
                  placeholder="لطفا عنوان کد  را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title"> درصد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="percent"
                  validations={[minValidator(1)]}
                  placeholder="لطفا  درصد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">محدودیت تعداد</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="max"
                  validations={[minValidator(1)]}
                  placeholder="لطفا  محدودیت  را مشخص کنید ..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره مدنظر
                </label>
                <select
                  class="select"
                  onChange={(e) => setOffCourse(e.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={createOff} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="کد های تخفیف">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>سازنده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>{off.creator}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeOff(off._id)}
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
