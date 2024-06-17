import React from "react";
import Link from "next/link";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LOGIN_PAGE, REGISTER_PAGE } from "@/constants/pages-url.constants";

const Header = () => {
  return (
    <Navbar className="px-5 pt-3" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Платформа тренировочных курсов</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link className="px-4" href={ LOGIN_PAGE }>Войти</Nav.Link>
          <Link href={ REGISTER_PAGE } passHref><Button variant="outline-light">Создать аккаунт</Button></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
