import { Switch } from "@mui/material";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp></SignUp>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
