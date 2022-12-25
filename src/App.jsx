import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/header";
import QueryList from "./components/queries-list";
import QueryEditor from "./components/query-editor";
import TableList from "./components/table-list";

function App() {
  const [query, setQuery] = useState("");
  const [tblName, setTblName] = useState("");
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]);

  const getValue = (params, key) => {
    if (typeof params.row[key] !== "object") return params.row[key];
    else return Object.values(params.row[key]).concat(" ");
  };
  useMemo(() => {
    if (tblName === "") return false;
    setQuery(`SELECT * FROM ${tblName};`);
    fetch(`${process.env.REACT_APP_BASE_URL}${tblName}.json`)
      .then((res) => res.json())
      .then((data) => {
        let columns = [];
        const width = Math.floor(
          window.innerWidth / Object.keys(data[0]).length
        );
        Object.keys(data[0]).forEach((d) => {
          columns.push({
            field: d,
            headerName: d,
            sortable: true,
            width: width,
            valueGetter: (params) => getValue(params, d)
          });
        });
        setCol(columns);
        setData(data);
      });
  }, [tblName]);

  return (
    <div className="App">
      <Header />
      <Grid container mt={2}>
        <Grid item md={2} xs={12}>
          <TableList setTblName={setTblName} />
        </Grid>
        <Grid item md={8} xs={12}>
          <QueryEditor query={query} setQuery={setQuery} />
        </Grid>
        <Grid item md={2} xs={12}>
          <QueryList tblName={tblName} query={query} setQuery={setQuery} />
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item md={12} xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            {data.length > 0 && (
              <DataGrid
                rows={data}
                columns={col}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => {
                  return row.customerID || row.employeeID || row.productID;
                }}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
