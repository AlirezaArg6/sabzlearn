import Index from "./pages/Index/Index";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Category from "./pages/Category/Category";
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Articles from "./pages/Articles/Articles";
import Contact from "./pages/Contact/Contact";
import Search from "./pages/Search/Search";

import AdminPanel from "./pages/AdminPanel/index.js";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import Menus from "./pages/AdminPanel/Menus/Menus";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import AdminCategories from "./pages/AdminPanel/Categories/Categories";
import AdminContact from "./pages/AdminPanel/Contact/Contact";
import Sessions from "./pages/AdminPanel/Sessions/Sessions";
import Session from "./pages/Session/Session";
import Comments from "./pages/AdminPanel/Comments/Comments";
import Offs from "./pages/AdminPanel/Offs/Offs";
import Draft from "./pages/AdminPanel/Articles/Draft";
import AdminHome from "./pages/AdminPanel/Index/Index";

import UserPanelHome from "./pages/UserPanel/Index";
import UserCourses from "./pages/UserPanel/Courses/Courses";
import UserOrders from "./pages/UserPanel/Orders/Orders";
import UserTickets from "./pages/UserPanel/Tickets/SendTicket";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:searchValue", element: <Search /> },
  { path: "/courses/:courseName/:sessionID", element: <Session /> },

  // admin panels routes

  {
    path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      { path: "", element: <AdminHome /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:articleName", element: <Draft /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "contact", element: <AdminContact /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
    ],
  },

  // user panel routes

  {
    path: "/my-account/*",
    element: <UserPanelHome />,
    children: [
      { path: "", element: <UserPanelHome /> },
      { path: "buyed", element: <UserCourses /> },
      { path: "send-ticket", element: <UserTickets /> },
      { path: "orders", element: <UserOrders /> },
    ],
  },
];

export default routes;
