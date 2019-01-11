import React, { Component } from "react";
import Markdown from "markdown-to-jsx";

class EditableMarkdown extends Component {
  displayName = EditableMarkdown;
  constructor(props) {
    super(props);
    this.state = {
      OnChange: props.OnChange,
      edit: false
    };
  }

  render() {
    const { OnChange, edit } = this.state;
    const text = this.props.text;
    const textAlt =
      text.length === 0
        ? "Click here to add a description"
        : text.replace("<", "&lt;");
    return (
      <div>
        {edit ? (
          <textarea
            rows="7"
            cols="30"
            autoFocus
            maxLength="280"
            onBlur={() => this.setState({ edit: false })}
            onChange={event => {
              OnChange(event.target.value);
            }}
            value={text}
          />
        ) : (
          <div
            className={text.length === 0 ? "default" : ""}
            onClick={() => this.setState({ edit: true })}
          >
            <Markdown>{textAlt}</Markdown>
          </div>
        )}
      </div>
    );
  }
}
export default EditableMarkdown;
