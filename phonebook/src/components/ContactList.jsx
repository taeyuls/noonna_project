import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import useContactStore from "../store/contactStore";

const ContactList = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const contacts = useContactStore((state) => state.contacts);
  const deleteContact = useContactStore((state) => state.deleteContact);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
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
      <Typography variant="h6" gutterBottom>
        연락처 목록
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          justifyContent: "center",
          alignItems: isMobile ? "stretch" : "center",
          gap: 1,
          marginBottom: 3,
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: isMobile ? "100%" : "30%",
            height: "40px",
            fontSize: "16px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #555",
            backgroundColor: "#1f1f2f",
            color: "#fff",
          }}
        />
        <Button
          onClick={() => setSearchTerm(inputValue)}
          sx={{
            padding: "8px 16px",
            backgroundColor: "#7b61ff",
            color: "#fff",
            borderRadius: "4px",
            textTransform: "none",
            width: isMobile ? "100%" : "auto",
            "&:hover": {
              backgroundColor: "#6a52e5",
            },
          }}
        >
          검색
        </Button>
      </Box>

      {filteredContacts.length === 0 ? (
        <Typography color="#aaa">저장된 연락처가 없습니다.</Typography>
      ) : (
        filteredContacts.map((contact) => (
          <Card
            key={contact.id}
            sx={{
              backgroundColor: "#1f1f2f",
              color: "#fff",
              marginBottom: 2,
              border: "1px solid #555",
              position: "relative",
              width: isMobile ? "100%" : "40vw",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                👤 {contact.name}
              </Typography>
              <Typography variant="body2" color="#aaa">
                📞 {contact.phoneNumber}
              </Typography>
              <IconButton
                onClick={() => deleteContact(contact.id)}
                sx={{ position: "absolute", top: 8, right: 8, color: "#aaa" }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ContactList;
