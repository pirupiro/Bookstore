import React from "react";
import '../styles/Pagination.css';
function Pagination( { pagination, onPageChange } ) {
  const { currentPage, pageCount} = pagination;

  const handleNextPage = (currentPage) => {
    if (!onPageChange) {
      console.log("not a function");
    }
    onPageChange(currentPage);
  };

  var pagesArray = [];
  for (var i = 1; i <= pageCount; i++) {
    pagesArray.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example ">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage <= 1}
              onClick={() => {
                onPageChange(currentPage - 1);
              }}
            >
              Previous
            </button>
          </li>
          <ul id='pagination' className="pagination">
            {pagesArray.map(number => (
              <li key={number} className='page-item'>
                <a onClick={() => {handleNextPage(number)}}  className='page-link'>
                  {number}
                </a>
              </li>
          ))}
          </ul>

          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage >= pageCount}
              onClick={() => {
                handleNextPage(currentPage + 1);
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination; 