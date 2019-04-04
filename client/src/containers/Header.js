/* eslint-disable indent */
/* eslint-disable react/require-render-return */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Header extends React.Component {
  // eslint-disable-next-line indent
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    // eslint-disable-next-line prettier/prettier
  auth,
  };
};

export default connect(mapStateToProps)(Header);
