import React from "react";

const PaginationTab = () => {
  return (
    <div className="pagination_container">
      <div className="pagination">
        <div
          className="pagination__item nav-btn right-btn"
          data-inactive={true}
        >
          <i className="ph-caret-left-bold" />
          <p>Prev</p>
        </div>

        {[1, 2, 3]?.map((page, index) => (
          <div
            key={index}
            className="pagination__item"
            data-active={index === 0}
          >
            {page}
          </div>
        ))}
        <div className="pagination__item">...</div>
        {[19, 20]?.map((page, index) => (
          <div key={index} className="pagination__item">
            {page}
          </div>
        ))}

        <div
          className="pagination__item nav-btn right-btn"
          data-inactive={!true}
        >
          <p>Next</p>
          <i className="ph-caret-right-bold" />
        </div>
      </div>
    </div>
  );
};

export default PaginationTab;
