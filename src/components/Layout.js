import { Box } from "@mui/material";
import Footer from "./Footer";
import MenuAppBar from "./MenuAppBar";

export function Layout(props) {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <MenuAppBar></MenuAppBar>
      <Box flexGrow={1}>{props.children}</Box>
      <Footer></Footer>
    </Box>
  );
}
