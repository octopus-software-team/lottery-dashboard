import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import ToTopOnNavigation from "./utils/ToTopOnNavigation";

const queryClient = new QueryClient();

import "./assets/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./assets/css/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <ToTopOnNavigation />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
