import PageHeader from "../components/PageHeader";
// import DaysSliderFilter from "../components/DaysSliderFilter";
import LotteriesSlider from "../components/LotteriesSlider";
import LotteriesTable from "../components/LotteriesTable";
import DataLoader from "../ui/DataLoader";
import useGetActiveLotteries from "../hooks/useGetActiveLotteries";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchActive, setSearchActive] = useState(
    searchParams.get("searchActive") || ""
  );

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const { data: activeLotteries, isLoading: activeLotteriesLoading } =
    useGetActiveLotteries();

  useEffect(() => {
    setSearchActive(searchParams.get("searchActive") || "");
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchActive = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("searchActive", searchActive);
    setSearchParams(params);
  };

  const handleSearchAll = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    setSearchParams(params);
  };

  return (
    <section className="home">
      <div className="container">
        <div className="row">
          <PageHeader />
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="header">
                <h1>القرعات </h1>
                <form className="search_form" onSubmit={handleSearchActive}>
                  <div className="input_field">
                    <img src="/assets/images/search.svg" alt="searchIcon" />
                    <input
                      type="text"
                      placeholder="ابحث عن قرعة"
                      value={searchActive}
                      onChange={(e) => setSearchActive(e.target.value)}
                    />
                  </div>
                  <button type="submit">
                    <img src="/assets/images/filter.svg" alt="filterIcon" />
                    تصفية
                  </button>
                </form>
              </div>
              {/* <DaysSliderFilter /> */}
              {activeLotteriesLoading ? (
                <DataLoader />
              ) : (
                <>
                  {!activeLotteries || activeLotteries?.length === 0 ? (
                    <div className="empty_data">
                      <img src="/assets/images/noData.svg" alt="no-data" />
                      <h5>لا يوجد قرعات بهذا الاسم</h5>
                    </div>
                  ) : (
                    <LotteriesSlider lotteries={activeLotteries} />
                  )}
                </>
              )}
              <div className="lotteries-pagination" />
              <div className="header">
                <h1>جميع القرعات</h1>
                <form className="search_form" onSubmit={handleSearchAll}>
                  <div className="input_field">
                    <img src="/assets/images/search.svg" alt="searchIcon" />
                    <input
                      type="text"
                      placeholder="ابحث عن قرعة"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button type="submit">
                    <img src="/assets/images/filter.svg" alt="filterIcon" />
                    تصفية
                  </button>
                </form>
              </div>
              <LotteriesTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
