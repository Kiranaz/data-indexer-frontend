import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Form from "../form";
import DetailPage from "../pages/DetailPage";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <div>
      <div>
        <div
          className="flex justify-between items-center px-10 py-2 bg-white/80
            backdrop-blur-md shadow-md  w-full
            fixed top-0 left-0 right-0 z-10"
        >
          <Link to="/">
            <div>Data Indexer</div>
          </Link>
          <Link to="/new">
            <button className="flex items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
              <span>Create New Indexer </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h13M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <div className="py-20">
        <Routes>
          <Route path="/new" element={<Form />} />
          <Route path="/indexer/:user/:address" element={<DetailPage />} />
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
