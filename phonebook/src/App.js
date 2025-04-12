import { Grid } from "@mui/material";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  return (
    <div className="App">
      <h1>연락처 앱</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ContactForm />
        </Grid>
        <Grid item xs={6}>
          <ContactList />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
