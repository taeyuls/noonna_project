import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const dummyContacts = [
  { id: 1, name: "김태율", phoneNumber: "010-1234-5678" },
  { id: 2, name: "서리", phoneNumber: "010-8765-4321" },
];

const ContactList = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        연락처 목록
      </Typography>
      <List>
        {dummyContacts.map((contact) => (
          <ListItem key={contact.id} divider>
            <ListItemText
              primary={contact.name}
              secondary={contact.phoneNumber}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContactList;
