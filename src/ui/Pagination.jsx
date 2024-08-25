import { useSearchParams } from "react-router-dom";
import PaginationNumbers from "./PaginationNumbers";

export default function Pagination({
  count,
  pageSize = 10,
  className,
  param = "page"
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastPage = Math.ceil(count / pageSize);
  const currentPage = parseInt(searchParams.get(param)) || 1;

  const atStart = currentPage <= 1;
  const atEnd = currentPage >= lastPage;

  function handlePrev(event) {
    event.preventDefault();
    if (!atStart) {
      const params = new URLSearchParams(searchParams);
      params.set(param, currentPage - 1);
      setSearchParams(params);
    }
  }

  function handleNext(event) {
    event.preventDefault();
    if (!atEnd) {
      const params = new URLSearchParams(searchParams);
      params.set(param, currentPage + 1);
      setSearchParams(params);
    }
  }

  function handleFirstPage(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set(param, 1);
    setSearchParams(params);
  }

  function handleLastPage(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set(param, lastPage);
    setSearchParams(params);
  }

  return (
    <div className={`pagination_component mt-4 ${className}`}>
      <div className="paginator_btns">
        <button onClick={handleFirstPage}>
          <i className="fa-regular fa-angles-right"></i>
        </button>
        <button onClick={handlePrev}>
          <i className="fa-regular fa-angle-right"></i>
        </button>
      </div>
      <PaginationNumbers
        currentPage={currentPage}
        lastPage={lastPage}
        param={param}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      <div className="paginator_btns">
        <button onClick={handleNext}>
          <i className="fa-regular fa-angle-left"></i>
        </button>
        <button onClick={handleLastPage}>
          <i className="fa-regular fa-angles-left"></i>
        </button>
      </div>
    </div>
  );
}
