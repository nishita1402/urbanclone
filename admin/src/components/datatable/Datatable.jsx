import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";
import axios from "axios";


const Datatable = ({columns}) => {


  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
    // console.log(data)
  }, [data]);

  // useEffect(() => {
  //   console.log(data, loading)
  // }
    // , [loading])
  const handleDelete = async (id) => {
    try {
      // console.log("delete", id)
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      // console.log(list)
    } catch (err) { }
  };




  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New 
        </Link>
      </div>
    
      {list ? <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
        getRowId={(row) => row._id}
      /> : <p>loading</p>}
    </div>
  );
};

export default Datatable;
