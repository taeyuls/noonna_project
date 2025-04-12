import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneBook, setPhoneBook] = useState([]); // ✅ 연락처 목록 상태로 관리

  const handleAddContact = () => {
    if (!name || !phoneNumber) {
      alert("이름과 전화번호를 입력해주세요!");
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
      phoneNumber,
    };

    setPhoneBook([...phoneBook, newContact]); // ✅ 새로운 연락처 추가

    // 입력창 초기화
    setName("");
    setPhoneNumber("");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <TextField
        id="name"
        label="이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="phoneNumber"
        label="전화번호"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddContact}>
        추가
      </Button>

      {/* 추가된 연락처 목록 확인용 */}
      <Box mt={4}>
        {phoneBook.map((contact) => (
          <Box key={contact.id} border="1px solid #ccc" p={1} my={1}>
            <div>👤 {contact.name}</div>
            <div>📞 {contact.phoneNumber}</div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContactForm;
