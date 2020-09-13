import React from "react";
import SearchBar from "../searchBar/SearchBar";
import "./styles.scss";
import { Featured } from "../featuers/Featured";

const Dash = (props) => {
  return (
    <div id="dashboard">
      <header>
        <h1>cuposearch</h1>
      </header>
      <SearchBar />
      <Featured />
    </div>
  );
};

Dash.propTypes = {};

export default Dash;
