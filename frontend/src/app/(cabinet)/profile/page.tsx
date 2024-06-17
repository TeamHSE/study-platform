import React from "react";

const Profile = () => {
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
            <button className="btn btn-danger">Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;