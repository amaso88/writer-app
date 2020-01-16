import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Pagination } from "reactstrap";

class PaginatorWidget extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired
  };

  state = {
    totalPages: 0
    // currentPage: 0
  };

  componentDidMount() {
    this.setState({
      totalPages: Math.ceil(Number(this.props.total / this.props.itemsPerPage))
    });
  }

  updateActivePage = currentPage => {
    // this.setState({ currentPage });
    this.props.onPageChanged(currentPage);
  };

  firtPage = () => {
    this.updateActivePage(1);
  };

  previousPage = () => {
    // this.setState({ currentPage: this.state.currentPage - 1 });
    this.updateActivePage(this.props.current - 1);
  };

  nextPage = () => {
    // this.setState({ currentPage: this.state.currentPage + 1 });
    this.updateActivePage(this.props.current + 1);
  };

  lastPage = () => {
    this.updateActivePage(this.state.totalPages);
  };

  showFirstButton = () => {
    if (this.props.current > 1) {
      return true;
    }
    return false;
  };

  showPrevButton = () => {
    if (this.props.current > 0) {
      return true;
    }
    return false;
  };

  showNextButton = () => {
    if (this.props.current < this.state.totalPages - 1) {
      return true;
    }
    return false;
  };

  showLastButton = () => {
    if (this.props.current < this.state.totalPages - 1) {
      return true;
    }
    return false;
  };

  itemsToDisplay = currentPage => {
    const items = [];

    for (var i = 0; i < this.state.totalPages; i++) {
      let item = {};
      if (i === currentPage - 1) {
        item.active = true;
      }

      items.push(item);
    }

    return items;
  };

  renderItem = (icon, text, onClick, isShowing) => (
    <Button
      outline
      size="sm"
      className="px-2"
      color="white"
      variant="info"
      onClick={onClick}
      disabled={isShowing() ? false : true}
    >
      {text}
    </Button>
  );

  render() {
    return (
      <Pagination aria-label="Page navigation example">
        
        {this.renderItem(
          "angle-left",
          "Prev",
          this.previousPage,
          this.showPrevButton
        )}
        {/* {this.itemsToDisplay(this.props.current).map( (item, index) => {
						console.log(item);
						return this.renderItem(String(index), () => this.updateActivePage(index + 1), () => true )
					})} */}
        {this.renderItem(
          "angle-right",
          "Next",
          this.nextPage,
          this.showNextButton
        )}
      </Pagination>
    );
  }
}

export default PaginatorWidget;
