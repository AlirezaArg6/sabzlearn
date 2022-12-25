import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";

import "./Pagination.css";

export default function Pagination({
  items,
  itemsCount,
  pathname,
  setShownItems,
}) {
  const [pagesCount, setPagesCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemsCount * page;
    let startIndex = endIndex - itemsCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShownItems(paginatedItems);

    let pagesNumber = Math.ceil(items.length / itemsCount);
    setPagesCount(pagesNumber);
  }, [page, items]);

  let activeStyle = {
    color: "var(--white-color)",
    backgroundColor: "var(--primary-color)",
  };

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {page > 1 ? (
          <li className="courses__pagination-item">
            <Link
              to={`${pathname}/${Number(page) - 1}`}
              className="courses__pagination-link"
            >
              <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
            </Link>
          </li>
        ) : null}
        {Array(pagesCount)
          .fill(0)
          .map((page, index) => (
            <li className={`courses__pagination-item`}>
              <NavLink
                to={`${pathname}/${index + 1}`}
                className="courses__pagination-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                {index + 1}
              </NavLink>
            </li>
          ))}
        {page < pagesCount ? (
          <li className="courses__pagination-item">
            <Link
              to={`${pathname}/${Number(page) + 1}`}
              className="courses__pagination-link"
            >
              <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
