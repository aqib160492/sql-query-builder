import { Link, List, ListItem, Typography } from "@mui/material";

const TableList = ({ setTblName }) => (
  <>
    <Typography variant="h6" component="h2" pl={2} align="left">
      Tables
    </Typography>
    <List>
      <ListItem>
        <Link component={"button"} onClick={() => setTblName("customers")}>
          Customers
        </Link>
      </ListItem>
      <ListItem>
        <Link component={"button"} onClick={() => setTblName("employees")}>
          Employees
        </Link>
      </ListItem>
      <ListItem>
        <Link component={"button"} onClick={() => setTblName("products")}>
          Products
        </Link>
      </ListItem>
      <ListItem>
        <Link component={"button"} onClick={() => setTblName("orders")}>
          Orders
        </Link>
      </ListItem>
    </List>
  </>
);

export default TableList;
