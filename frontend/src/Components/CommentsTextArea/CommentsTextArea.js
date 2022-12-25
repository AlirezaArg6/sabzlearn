import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";

import "./CommentsTextArea.css";

export default function CommentsTextArea({ comments, submitComment }) {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [commentScore, setCommentScore] = useState("-1");

  const authContext = useContext(AuthContext);

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <div className="comments__item" key={comment._id}>
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator.name}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        پاسخ
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                </div>
                {comment.answerContent && (
                  <div className="comments__item mt-5" key={comment._id}>
                    <div className="comments__question">
                      <div className="comments__question-header">
                        <div className="comments__question-header-right">
                          <span className="comments__question-name comment-name">
                            {comment.answerContent.creator.name}
                          </span>
                          <span className="comments__question-status comment-status">
                            {comment.answerContent.creator.role === "ADMIN"
                              ? "مدیر"
                              : "کاربر"}
                          </span>
                          <span className="comments__question-date comment-date">
                            {comment.answerContent.createdAt.slice(0, 10)}
                          </span>
                        </div>
                        <div className="comments__question-header-left">
                          <a
                            className="comments__question-header-link comment-link"
                            href="#"
                          >
                            پاسخ
                          </a>
                        </div>
                      </div>
                      <div className="comments__question-text">
                        <p className="comments__question-paragraph comment-paragraph">
                          {comment.answerContent.body}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {authContext.isLoggedIn ? (
        <>
          <div className="comments__rules">
            <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش
              انلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              دیدگاه های نامرتبط به دوره تایید نخواهد شد.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              از درج دیدگاه های تکراری پرهیز نمایید.
            </span>
          </div>
          <div className="comments__respond">
            <div className="comments__score">
              <span className="comments__score-title">امتیاز شما</span>
              <div className="comments__score-input">
                {/* <span className="comments__score-input-text">
                  امتیاز خود را انتخاب کنید
                </span> */}
                <select
                  className="form-select form-control font-bold"
                  onChange={(event) => setCommentScore(event.target.value)}
                >
                  <option value="-1" className="form-control">
                    امتیاز خود را انتخاب کنید
                  </option>
                  <option value="5">عالی</option>
                  <option value="4">خیلی خوب</option>
                  <option value="3">خوب</option>
                  <option value="2">ضعیف</option>
                  <option value="1">بد</option>
                </select>

                <i className="fas fa-angle-down	 comments__input-icon"></i>
              </div>
            </div>
            <div className="comments__respond-content">
              <div className="comments__respond-title">دیدگاه شما *</div>
              <textarea
                className="comments__score-input-respond"
                onChange={(e) => {
                  setNewCommentBody(e.target.value);
                }}
              >
                {newCommentBody}
              </textarea>
            </div>
            <button
              type="submit"
              className="comments__respond-btn"
              onClick={() => submitComment(newCommentBody, commentScore)}
            >
              ارسال
            </button>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">
          {" "}
          برای ثبت کامنت وارد{" "}
          <Link to="/login" style={{ color: "blue" }}>
            حساب کاربری
          </Link>{" "}
          خود شوید.
        </div>
      )}
    </div>
  );
}
