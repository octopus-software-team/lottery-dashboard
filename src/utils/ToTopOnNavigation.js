import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ToTopOnNavigation = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const isSearching = searchParams.size > 0;

    if (!isSearching) {
      window.scrollTo(0, 0);
    }
  }, [location, searchParams]);

  return null;
};

export default ToTopOnNavigation;
