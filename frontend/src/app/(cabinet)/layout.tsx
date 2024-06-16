import React, { ReactNode } from "react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex">
      <aside className="bg-dark text-white p-4 position-fixed" style={ { width: "250px", height: "100vh" } }>
        <div className="mb-4">
          <Link className="h2 bi-person-badge" href="/profile">Профиль</Link>
        </div>
        <nav className="nav flex-column">
          <Link className="nav-link text-white" href="/dashboard">📊 Главная</Link>
          <Link className="nav-link text-white" href="/courses">📚 Курсы</Link>
          <Link className="nav-link text-white" href="/statistics">📈 Статистика</Link>
          <Link className="nav-link text-white" href="/settings">⚙️ Настройки</Link>
        </nav>
        <div className="mt-auto">
          <Link className="nav-link text-white" href="/logout">🚪 Выйти</Link>
        </div>
      </aside>
      <main className="p-4" style={ { marginLeft: "250px", width: "calc(100% - 250px)" } }>
        { children }
      </main>
    </div>
  );
};

export default Layout;
