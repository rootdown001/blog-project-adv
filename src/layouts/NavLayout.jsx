import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Navbar from "../Navbar";

export default function NavLayout() {
  // get state from useLocation
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <div className={isLoading ? "loading-spinner" : ""}></div>
      <div className={`container ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}
