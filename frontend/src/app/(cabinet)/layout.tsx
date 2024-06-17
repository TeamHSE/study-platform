import React, { ReactNode } from "react";
import Link from "next/link";
import { COURSES_PAGE, PROFILE_PAGE } from "@/constants/pages-url.constants";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex">
      <aside className="bg-dark text-white p-4 position-fixed" style={ { width: "250px", height: "100vh" } }>
        <div className="mb-4">
          <Link className="h2 bi-person-badge" href={ PROFILE_PAGE }>Профиль</Link>
        </div>
        <nav className="nav flex-column">
          <Link className="nav-link text-white" href={ COURSES_PAGE }>📚 Курсы</Link>
        </nav>
      </aside>
      <main className="p-4" style={ { marginLeft: "250px", width: "calc(100% - 250px)" } }>
        { children }
      </main>
    </div>
  );
};

export default Layout;
