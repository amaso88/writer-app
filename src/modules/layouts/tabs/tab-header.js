import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavItem, NavLink } from "reactstrap";

class TabHeader extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = e => {
    e.preventDefault();
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label }
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (
      <NavItem>
        <NavLink
          active={activeTab === label}
          to="#"
          className={className}
          onClick={onClick}
        >
          {label}
        </NavLink>
      </NavItem>
    );
  }
}

export default TabHeader;
