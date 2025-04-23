import "@fontsource/orbitron/500.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AppLayout.style.css";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchByKeyword = (e) => {
    e.preventDefault();

    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div className="layout-root">
      <Navbar
        expand="lg"
        bg="black"
        variant="black fixed-top"
        className="navbar-custom"
      >
        <Container fluid>
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center me-3"
          ></Link>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              src="/images/MM_Logo.png"
              alt="Movie Monster"
              className="logo-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll">
            <i
              className="bi bi-list"
              style={{ fontSize: "1.8rem", color: "#0ff" }}
            ></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-light"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="nav-link-custom">
                홈
              </Nav.Link>
              <Nav.Link href="/movies" className="nav-link-custom">
                영화
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search-input"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline-light"
                className="search-button"
              >
                <i
                  className="bi bi-search"
                  style={{ fontSize: "1rem", color: "#0ff" }}
                ></i>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="px-5 py-5" style={{ marginTop: "90px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
