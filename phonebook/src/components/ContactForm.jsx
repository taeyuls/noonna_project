import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber) {
      alert("이름과 번호를 입력하세요!");
      return;
    }

    onAddContact(name, phoneNumber);
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
        variant="contained"
        fullWidth
        sx={{
          marginTop: 2,
          backgroundColor: "#7b61ff",
          ":hover": { backgroundColor: "#9e85ff" },
        }}
      >
        연락처 추가
      </Button>
    </Box>
  );
};

export default ContactForm;
