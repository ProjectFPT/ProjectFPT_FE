import React, { Component } from "react";
import "../css/bootstrap.css";
import DarkModeToggle from "./DarkModeToggle";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    ActiveAddData: state.StatusHeader.activeAdd,
    ActiveCompareData: state.StatusHeader.activeCompare,
  };
}

class Header extends Component {
  render() {
    console.log(this.props.ActiveAddData);
    console.log(this.props.ActiveCompareData);
    return (
      <div>
        <header className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-color fixed-top">
            <a className="navbar-brand" href="/">
              <img src="./logo.jpg" alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li
                  className={
                    this.props.ActiveAddData ? "nav-item active" : "nav-item"
                  }
                >
                  <a
                    className="nav-link"
                    href="/"
                  >
                    Import
                  </a>
                </li>
                <li
                  className={
                    this.props.ActiveCompareData
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <a
                    className="nav-link"
                    href="/Compare"
                  >
                    Compare
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Header - set the background image for the header in the line below*/}
        </header>
        <div className="py-5 bg_img img-fluid">
          <div className="text-center my-5">
            <img
              className="img-fluid"
              src="https://fptsaigon.com.vn/wp-content/uploads/logo-fpt-300x174.jpg"
              alt="..."
            />
            <p className="text-white-50 mb-0"></p>
          </div>
        </div>
        <DarkModeToggle></DarkModeToggle>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Header);
