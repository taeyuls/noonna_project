import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#2a2a3d",
        padding: 4,
        borderRadius: 3,
        color: "white",
        boxShadow: "0 8px 16px rgba(123, 97, 255, 0.2)",
        border: "1px solid #444",
      }}
    >
      <Typography variant="h6" gutterBottom>
        연락처 목록
      </Typography>

      {contacts.length === 0 ? (
        <Typography color="#aaa">저장된 연락처가 없습니다.</Typography>
      ) : (
        contacts.map((contact) => (
          <Card
            key={contact.id}
            sx={{
              backgroundColor: "#1f1f2f",
              color: "#fff",
              marginBottom: 2,
              border: "1px solid #555",
              position: "relative",
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
                onClick={() => onDelete(contact.id)}
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
