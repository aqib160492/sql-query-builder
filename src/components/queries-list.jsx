import { Typography, List, ListItem, Link } from "@mui/material";
const QueryList = ({ query, tblName, setQuery }) => (
  <>
    <Typography variant="h6" component="h2" pl={2} align="left">
      Queries
    </Typography>
    <List>
      <ListItem>
        <Link
          component="button"
          onClick={() => {
            setQuery(`SELECT * FROM ${tblName || "table_name"};`);
          }}>
          SELECT
        </Link>
      </ListItem>
      <ListItem>
        <Link
          component="button"
          onClick={() => {
            setQuery(
              `INSERT INTO ${
                tblName || "table_name"
              } (column1, column2, column3) VALUES ('value1', 'value2', 'value3');`
            );
          }}>
          INSERT
        </Link>
      </ListItem>
      <ListItem>
        <Link
          component="button"
          onClick={() => {
            setQuery(
              `UPDATE ${
                tblName || "table_name"
              } SET column1 = 'value1', column2 = 'value2' WHERE condition;`
            );
          }}>
          UPDATE
        </Link>
      </ListItem>
      <ListItem>
        <Link
          component="button"
          onClick={() => {
            setQuery(`DELETE FROM ${tblName || "table_name"} WHERE condition;`);
          }}>
          DELETE
        </Link>
      </ListItem>
    </List>
  </>
);

export default QueryList;
