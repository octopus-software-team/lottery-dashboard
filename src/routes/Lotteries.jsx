import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LotteriesTable from "../components/LotteriesTable";
import PageHeader from "../components/PageHeader";

export default function Lotteries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "active");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "active");
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = Object.fromEntries(searchParams.entries());
    params.search = search;
    setSearchParams(params);
  };

  const handleStatusChange = (e) => {
    const status = e.target.id;
    const params = Object.fromEntries(searchParams.entries());
    params.status = status;
    setSearchParams(params);
  };

  return (
    <section className="lotteries">
      <div className="container">
        <div className="row">
          <PageHeader path={[{ name: "قائمة القرعات", path: "/lotteries" }]} />
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="header">
                <h1>جميع القرعات</h1>
                <form className="search_form" onSubmit={handleSubmit}>
                  <div className="input_field">
                    <img src="/assets/images/search.svg" alt="searchIcon" />
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={search}
                      placeholder="ابحث عن قرعة"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Link to="/lotteries/add-lottery">
                    <img src="/assets/images/plus.svg" alt="filterIcon" />
                    إضافة قرعة
                  </Link>
                </form>
              </div>
              <div className="lotteries_type">
                <label htmlFor="active">
                  <input
                    type="radio"
                    id="active"
                    name="lotteries"
                    value={status}
                    checked={status === "active"}
                    onChange={handleStatusChange}
                  />
                  <div className="content">
                    <h3>القرعات الفعالة</h3>
                  </div>
                </label>
                <label htmlFor="inactive">
                  <input
                    type="radio"
                    id="inactive"
                    name="lotteries"
                    value={status}
                    checked={status === "inactive"}
                    onChange={handleStatusChange}
                  />
                  <div className="content">
                    <h3>القرعات المنتهية</h3>
                  </div>
                </label>
              </div>
              <LotteriesTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
