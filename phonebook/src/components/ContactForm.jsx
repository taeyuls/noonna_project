import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import useContactStore from "../store/contactStore";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const addContact = useContactStore((state) => state.addContact);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber) {
      alert("이름과 번호를 입력하세요!");
      return;
    }

    addContact(name, phoneNumber);
    setName("");
    setPhoneNumber("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#2a2a3d",
        padding: 4,
        borderRadius: 3,
        color: "white",
        boxShadow: "0 8px 16px rgba(123, 97, 255, 0.2)",
        border: "1px solid #444",
        width: isMobile ? "90%" : "40vw",
        margin: "0 auto",
        marginBottom: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        label="이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: "white" } }}
        InputLabelProps={{ style: { color: "#aaa" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#555" },
          },
        }}
      />

      <TextField
        label="전화번호"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{ style: { color: "white" } }}
        InputLabelProps={{ style: { color: "#aaa" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#555" },
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        sx={{
          marginTop: 2,
          padding: "12px",
          backgroundColor: "#7b61ff",
          color: "#fff",
          borderRadius: "4px",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#6a52e5",
          },
        }}
      >
        연락처 추가
      </Button>
    </Box>
  );
};

export default ContactForm;
