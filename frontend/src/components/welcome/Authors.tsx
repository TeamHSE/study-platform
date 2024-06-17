import React from "react";

const AuthorsSection = () => {
  return (
    <>
      <div className="text-center mb-5">
        <h2 className="py-5">Об авторах</h2>
      </div>
      <div className="container pb-5">
        <div className="row pb-5">
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h4><a href="https://t.me/aleksnekr">@aleksnekr</a></h4>
                <p>Role: Front-end</p>
                <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h4><a href="https://t.me/dimamrkv">@dimamrkv</a></h4>
                <p>Role: Front-end</p>
                <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h4><a href="https://t.me/zakhar_mol4anov">@zakhar_mol4anov</a></h4>
                <p>Role: Back-end</p>
                <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h4><a href="https://t.me/crazygrisha">@crazygrisha</a></h4>
                <p>Role: Back-end</p>
                <p><a href="mailto:mail@main.com">mail@main.com</a></p>
                <p><a href="tel:+79000000000">+7 (900) 000-00-00</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorsSection;
