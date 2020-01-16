import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";

export default class CKEditorWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  static propTypes = {
    html: PropTypes.string,
    short: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired
  };

  onChange = evt => {
    // console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({ content: newContent });
    this.props.changeHandler(newContent);
  };

  componentDidMount() {
    let newContent = "";
    if (this.props.html.length > 0) {
      newContent = this.props.html;
    } else {
      newContent = `
    ${this.props.short} <br/>
    ${this.props.large} <br/>   
    `;
    }

    this.setState(
      { content: newContent },
      this.props.changeHandler(newContent)
    );
  }

  // onBlur = (evt) => {
  //   console.log("onBlur event called with event info: ", evt);
  // }

  // afterPaste = (evt) => {
  //   console.log("afterPaste event called with event info: ", evt);
  // }

  render() {
    return (
      <CKEditor
        activeClass="p10"
        content={this.state.content}
        events={{
          // blur: this.onBlur,
          // afterPaste: this.afterPaste,
          change: this.onChange
        }}
      />
    );
  }
}
