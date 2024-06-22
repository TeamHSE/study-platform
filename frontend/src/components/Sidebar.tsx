"use client";

import React from "react";
import { BiUser } from "react-icons/bi";
import { SiCoursera } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";
import { PROFILE_PAGE, COURSES_PAGE, DASHBOARD_PAGE, WELCOME_PAGE } from "@/constants/pages-url.constants";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-dark text-white p-4 position-fixed" style={ { width: "300px", height: "100vh" } }>
      <div className="my-4">
        <Link className="h2 text-warning font-weight-bold text-shadow text-decoration-underline" href={ WELCOME_PAGE }>
          <b>Train&nbsp;Platform</b>
        </Link>
      </div>
      <nav className="nav flex-column my-4 pt-4">
        <Link href={ PROFILE_PAGE }
              className={ "nav-link text-white fs-4 p-2 border border-transparent hover-border-white rounded }" }>
          <BiUser /> Профиль
        </Link>
      </nav>
      <nav className="nav flex-column my-4">
        <Link href={ DASHBOARD_PAGE }
              className={ "nav-link text-white fs-4 p-2 border border-transparent hover-border-white rounded }" }>
          <RxDashboard /> Статистика
        </Link>
      </nav>
      <nav className="nav flex-column my-4">
        <Link href={ COURSES_PAGE }
              className={ "nav-link text-white fs-4 p-2 border border-transparent hover-border-white rounded }" }>
          <SiCoursera /> Курсы
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
