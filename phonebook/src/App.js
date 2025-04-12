import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  // ✅ localStorage에서 초기 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("contacts");
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  // ✅ 연락처 추가
  const handleAddContact = (name, phoneNumber) => {
    const newContact = {
      id: Date.now(),
      name,
      phoneNumber,
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  // ✅ 연락처 삭제
  const handleDeleteContact = (id) => {
    const updated = contacts.filter((contact) => contact.id !== id);
    setContacts(updated);
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#1e1e2f",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} maxWidth="md">
        <Grid item xs={12} md={6}>
          <ContactForm onAddContact={handleAddContact} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactList contacts={contacts} onDelete={handleDeleteContact} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
