import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";

const AdminLayout = (props) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="dashboard">
      <MetaData title={props.metaTitle} />
      <Sidebar />

      <div className="dashboardContainer">
        <div className="profile-bar">
          <span className="name">{user.name}</span>
          <span className="admin">Admin</span>
        </div>
        <Typography component="h1">
          {props.pageTitle}
          {props.titleBar}
        </Typography>

        <div className="pageContent">{props.childHtml}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
