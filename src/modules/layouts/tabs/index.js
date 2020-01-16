import React, { Component } from "react";
import PropTypes from "prop-types";
import TabHeader from "./tab-header";
import { Nav } from "reactstrap";

class TabsWidget extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.children[0].props.label
    };
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="tabs">
        <Nav className="nav-tabs mt-5 nav-fill">
          {children.map(child => {
            const { label } = child.props;

            return (
              <TabHeader
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </Nav>
        <div style={{ paddingTop: "20px" }} className="container-fluid">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default TabsWidget;
