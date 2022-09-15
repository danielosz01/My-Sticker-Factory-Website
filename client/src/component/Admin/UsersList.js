import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import MUIDataTable from "mui-datatables";

import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import AdminLayout from "./AdminLayout";

const options = {
  print: false,
  download: false,
  filter: false,
  viewColumns: false,
  selectableRowsHideCheckboxes: true,
  rowsPerPage: 50,
  rowsPerPageOptions: [5, 10, 50, 100],
};

const UsersList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    {
      name: "index",
      label: "Sr. No",
      options: { sort: false, searchable: false },
    },
    "User",
    "Email",
    "Address",
    "Phone",
    {
      name: "Action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Fragment>
              <Link to={`/admin/user/${value}`}>
                <img
                  src="/assets/images/edit.png"
                  alt="edit"
                  className="mt-1"
                />
              </Link>

              <Button onClick={() => deleteUserHandler(value)}>
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
        sort: false,
      },
    },
  ];
  const rows = users.map((e, i) => {
    return [
      `${i < 9 ? "0" : ""}${i + 1}`,
      e.name,
      e.email,
      "Address",
      "34532464536",
      e._id,
    ];
  });

  return (
    <AdminLayout
      metaTitle="All Users - Admin"
      pageTitle="Users List"
      childHtml={
        <MUIDataTable
          className="material-table"
          title={`Total users: ${users.length}`}
          data={rows}
          columns={columns}
          options={options}
        />
      }
    />
  );
};

export default UsersList;
