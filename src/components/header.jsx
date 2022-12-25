import { Box, AppBar, Toolbar, Typography } from "@mui/material";
const Header = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" component="h1" color="inherit">
          SQL Query Builder
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);
export default Header;
