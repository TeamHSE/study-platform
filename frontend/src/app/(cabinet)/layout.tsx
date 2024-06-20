import React, { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="p-4" style={ { marginLeft: "300px", width: "calc(100% - 300px)" } }>
        { children }
      </main>
    </div>
  );
};

export default Layout;
