"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { WELCOME_PAGE } from "@/constants/pages-url.constants";
import { authService } from "@/services/auth.service";

const Profile = () => {
  const router = useRouter();
  const logout = async () => {
    await authService.logout();
    router.push(WELCOME_PAGE);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <h2>LOGO</h2>
          <p className="text-muted"></p>
        </div>
        <div className="col-md-8">
          <h3>Информация</h3>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> johndoe@example.com</li>
            <li><strong>Телефон:</strong> (123) 456-7890</li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-primary">Редактировать профиль</button>
            <button onClick={ logout } className="btn btn-danger">Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;