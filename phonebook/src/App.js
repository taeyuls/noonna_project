import { Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: 5 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#fff" }}
        >
          연락처 관리 앱
        </Typography>

        <ContactForm />
        <ContactList />
      </Container>
    </>
  );
};

export default App;
