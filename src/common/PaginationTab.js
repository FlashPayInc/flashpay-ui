import { useEffect, useState } from "react";

const PaginationTab = ({ pageNum, active, setActive }) => {
  const handleChange = num => {
    if (num < 1 || num > pageNum) return;
    setActive(num);
    console.log(num);
  };

  return pageNum <= 1 ? (
    <></>
  ) : (
    <div className="pagination_container">
      <div className="pagination">
        <div
          data-hidden={pageNum < 6}
          data-inactive={active === 1}
          className="pagination__item nav-btn right-btn"
          onClick={e => {
            if (active > 1) setActive(p => --p);
          }}
        >
          <i className="ph-caret-left-bold" />
          <p>Prev</p>
        </div>

        {[
          ...Array.from({ length: pageNum < 3 ? pageNum : 3 }, (_, i) => {
            return pageNum < 5
              ? i + 1
              : active >= pageNum - 3
              ? i + pageNum - 4
              : active >= 3
              ? i + active - 1
              : i + 1;
          }),
        ]?.map((page, index) => (
          <div
            key={index}
            className="pagination__item"
            data-active={page === active}
            onClick={e => handleChange(page)}
          >
            {page}
          </div>
        ))}
        <div className="pagination__item" data-hidden={pageNum < 6}>
          ...
        </div>

        {[
          ...Array.from(
            { length: pageNum > 5 ? 2 : pageNum > 3 ? pageNum - 3 : 0 },
            (_, i) => (pageNum >= 5 ? pageNum + i - 1 : pageNum + i)
          ),
        ]?.map((page, index) => (
          <div
            key={index}
            className="pagination__item"
            data-active={page === active}
            onClick={e => handleChange(page)}
          >
            {page}
          </div>
        ))}

        <div
          data-hidden={pageNum < 6}
          data-inactive={active === pageNum}
          className="pagination__item nav-btn right-btn"
          onClick={e => {
            if (active < pageNum) setActive(p => ++p);
          }}
        >
          <p>Next</p>
          <i className="ph-caret-right-bold" />
        </div>
      </div>
    </div>
  );
};

export default PaginationTab;
