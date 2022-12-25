import React, { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  function getAllContacts() {
    fetch(`http://localhost:4000/v1/contact`)
      .then((res) => res.json())
      .then((allContacts) => setContacts(allContacts));
  }

  const showContactMessage = (msg) => {
    swal({
      title: msg,
      buttons: "دیدم",
    });
  };

  const answerToContactMessage = (userEmail) => {
    swal({
      title: "پاسخ خود را وارد کنید",
      content: "input",
      buttons: "ارسال کن",
    }).then((value) => {
      if (value.trim().length) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        const answerInfo = {
          email: userEmail,
          answer: value,
        };
        fetch(`http://localhost:4000/v1/contact/answer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageData.token}`,
          },
          body: JSON.stringify(answerInfo),
        }).then((res) => {
          if (res.ok) {
            res.json();
            getAllContacts();
            console.log(res);
            swal({
              title: "پاسخ با موفقیت ارسال شد",
              icon: "success",
              buttons: "حله",
            });
          }
        });
      } else {
        swal({
          title: "برای ارسال پیام چیزی وارد کنید",
          icon: "warning",
          buttons: "دوباره امتحان کن",
        });
      }
    });
  };

  const deleteContact = (contactID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "آیا از حذف مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/contact/${contactID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف با موفقیت انجام شد",
              icon: "success",
              buttons: "اوکی",
            }).then((res) => getAllContacts());
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title="پیغام‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td
                  className={`${
                    contact.answer ? "answer-contact" : "not-answer-contact"
                  }`}
                >
                  {index + 1}
                </td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => showContactMessage(contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => answerToContactMessage(contact.email)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => deleteContact(contact._id)}
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
