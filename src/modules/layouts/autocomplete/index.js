import React, { Component } from "react";
import PropTypes from "prop-types";
import CreatableWidget from "./creatable";
import SelectWidget from "./select";

export default class AutoComplete extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array,
    defaultLabel: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isCreatable: PropTypes.bool
  };

  state = {
    isLoading: false,
    isCreatable: false,
    options: [],
    selectedOptions: []
  };

  componentDidMount() {
    this.prepareOptions();
  }

  checkIfSelectedOptionsChange = nextProps => {
    if (
      nextProps.selectedOptions &&
      this.state.selectedOptions.length !== nextProps.selectedOptions.length
    ) {
      return true;
    }

    for (let i = 0; i < nextProps.selectedOptions.length; i++) {
      const nextSelected = nextProps.selectedOptions[i];
      let iquals = false;
      for (let j = 0; j < this.state.selectedOptions.length; j++) {
        const stateSelected = this.state.selectedOptions[j];
        if (nextSelected[this.props.defaultValue] == stateSelected.value) {
          iquals = true;
          break;
        }
      }
      if (!iquals) {
        return true;
      }
    }

    return false;
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      (nextProps.options &&
        this.state.options.length !== nextProps.options.length) ||
      this.checkIfSelectedOptionsChange(nextProps)
    ) {
      this.prepareOptions();
      return true;
    }
    return false;
  }

  prepareOptions = () => {
    // this.setState({
    //     ...this.state,
    //     isLoading: true,
    // })

    // console.log(this.props.selectedOptions);

    let options = this.props.options.map(option => {
      return {
        label: option[this.props.defaultLabel],
        value: option[this.props.defaultValue]
      };
    });

    let selectedOptions = this.props.selectedOptions.map(selectedOption => {
      return {
        label: selectedOption[this.props.defaultLabel],
        value: selectedOption[this.props.defaultValue]
      };
    });

    // console.log("this.props.selectedOptions");
    // console.log(this.props.selectedOptions);

    this.setState({
      ...this.state,
      // isLoading: false,
      isCreatable: this.props.isCreatable ? true : false,
      options,
      selectedOptions
    });
  };

  handleChange = (newValue, actionMeta) => {
    this.props.handleChange(newValue);
  };

  handleCreate = inputValue => {
    this.props.handleCreate(inputValue);
  };

  render() {
    const { options, selectedOptions } = this.state;
    return this.props.isCreatable ? (
      <CreatableWidget
        isClearable
        isMulti={this.props.isMulti}
        handleChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
        className="text-dark multi-select-options"
        value={
          selectedOptions && selectedOptions.length > 0 ? selectedOptions : []
        }
      />
    ) : (
      <SelectWidget
        isClearable
        isMulti={this.props.isMulti}
        handleChange={this.handleChange}
        options={options}
        className="text-dark multi-select-options"
        value={
          selectedOptions && selectedOptions.length > 0 ? selectedOptions : []
        }
      />
    );
  }
}
