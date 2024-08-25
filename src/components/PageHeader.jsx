import { Link } from "react-router-dom";
import { Fragment } from "react";

function PageHeader({ path = [], base = "الرئيسية" }) {
  return (
    <div className="col-12 p-2">
      <div className="page_header">
        <div className="home">
          <div className="icon">
            <img src="/assets/images/home-line.svg" alt="homeIcon" />
          </div>
          {path.length === 0 ? (
            <h6 className="active" to="/">
              {base}
            </h6>
          ) : (
            <Link to="/">{base}</Link>
          )}
        </div>
        {path.map((item, index) => {
          return (
            <Fragment key={index}>
              <img src="/assets/images/arrow-left.svg" alt="arrow" />
              {index === path.length - 1 ? (
                <h6 className="active" to={item.path}>
                  {item.name}
                </h6>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PageHeader;
