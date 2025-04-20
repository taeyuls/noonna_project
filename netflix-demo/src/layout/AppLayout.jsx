import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
      <Navbar expand="lg" bg="black" variant="black">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/images/Netflix-Logo.png"
              alt="Netflix"
              height="70px"
              style={{ marginRight: "10px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-light"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="text-light">
                Home
              </Nav.Link>
              <Nav.Link href="/movies" className="text-light">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{
                  width: "15vw",
                  height: "40px",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "1px solid #555",
                }}
              />
              <Button
                variant="outline-light"
                style={{
                  width: "40px",
                  height: "40px",
                  padding: "0",
                  border: "1px solid red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <i
                  className="bi bi-search"
                  style={{ fontSize: "1rem", color: "red" }}
                ></i>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
