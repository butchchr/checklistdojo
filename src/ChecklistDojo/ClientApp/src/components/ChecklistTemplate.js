import React, { Component } from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ChecklistTemplateItem from "./ChecklistTemplateItem";
import ChecklistTemplateTools from "./ChecklistTemplateTools";
import "./ChecklistTemplate.css";
import "./Theme.css";
import EditableMarkdown from "./EditableMarkdown";

export default class ChecklistTemplate extends Component {
  displayName = ChecklistTemplate;
  constructor(props) {
    super(props);

    // This should work as our general core format for a checklist, though it is missing
    // the metadata we'll need for database idos, user idos, etc
    this.state = {
      title: "",
      description: "",
      items: [
        { text: "first thing", selected: true },
        { text: "secound thing", selected: false },
        { text: "fith thing", selected: false },
        { text: "Part C", selected: false }
      ]
    };
  }

  handleItemSelect = event => {
    const key = parseInt(event.target.id);
    const changedItems = this.state.items.map((value, index) => {
      return { ...value, selected: index === key };
    });
    this.setState({
      items: changedItems
    });
  };
  handleItemTextChange = text => {
    const newItems = this.state.items.map(value => {
      value.text = value.selected ? text : value.text;
      return value;
    });
    this.setState({
      items: newItems
    });
  };

  handleDescriptionUpdate = text => {
    this.setState({
      description: text
    });
  };

  handleItemMoveUp = () => {
    const key = this.state.items.findIndex(value => value.selected === true);
    const switchItem = this.state.items[key];
    var newItems = this.state.items;
    newItems[key] = newItems[key - 1];
    newItems[key - 1] = switchItem;

    this.setState({
      items: newItems
    });
  };

  handleItemMoveDown = () => {
    const key = this.state.items.findIndex(value => value.selected === true);
    const switchItem = this.state.items[key];
    var newItems = this.state.items;
    newItems[key] = newItems[key + 1];
    newItems[key + 1] = switchItem;
    this.setState({
      items: newItems
    });
  };

  handleItemRemove = () => {
    if (this.state.items.length < 2) {
      this.setState({
        items: [{ text: "", selected: true }]
      });
    } else {
      const indexOfItemToRemove = this.state.items.findIndex(
        i => i.selected === true
      );
      const lastItemWasRemoved =
        indexOfItemToRemove >= this.state.items.length - 1;
      const itemsWithItemRemoved = this.state.items.filter(
        value => !value.selected
      );
      const length = itemsWithItemRemoved.length - 1;
      const itemsWithNextItemSelected = itemsWithItemRemoved.map(
        (val, index) => {
          return {
            ...val,
            selected:
              indexOfItemToRemove == index ||
              (lastItemWasRemoved && length == index)
          };
        }
      );
      this.setState({
        items: itemsWithNextItemSelected
      });
    }
  };

  handleItemAdd = newText => {
    const selectedItem = this.state.items.findIndex(
      value => value.selected === true
    );
    const firstHalf = this.state.items.filter(
      (value, index) => index <= selectedItem
    );
    const removedSelected = firstHalf.map(i => {
      return { ...i, selected: false };
    });
    const secondHalf = this.state.items.filter((value, index) => {
      if (index > selectedItem) {
        return { ...value, selected: false };
      }
    });
    const addItemAtPosition = removedSelected.concat([
      {
        text: newText,
        selected: true
      },
      ...secondHalf
    ]);

    this.setState({
      items: addItemAtPosition
    });
  };

  render() {
    const { title, description, items } = this.state;
    return (
      <div>
        <NavLink to="/" tag={Link} className="noColor">
          <FontAwesomeIcon icon={faHome} size={"1x"} />
          Home
        </NavLink>
        <h1>
          <input
            type="text"
            placeholder="Blank Template"
            className="noDisplay"
            maxLength="72"
            value={title}
            onChange={e => this.setState({ title: e.value })}
          />
        </h1>
        <EditableMarkdown
          text={description}
          OnChange={this.handleDescriptionUpdate}
        />
        <br />
        <div className="scroller">
          <ul className="removeBullets">
            {items.map((value, index) => (
              <div
                key={index}
                className={`checklistTemplateItems ${
                  value.selected ? "selected" : "notSelected"
                }`}
              >
                <span>{index}</span>
                <ChecklistTemplateItem
                  text={value.text}
                  placeholder={"Add New Item"}
                  id={index}
                  key={index}
                  select={this.handleItemSelect}
                  textChange={this.handleItemTextChange}
                />
              </div>
            ))}
          </ul>
        </div>
        <br />
        <ChecklistTemplateTools
          moveItemUp={this.handleItemMoveUp}
          moveItemDown={this.handleItemMoveDown}
          deleteItem={this.handleItemRemove}
          noSelected={items.length === 0}
          firstSelected={items[0].selected}
          lastSelected={items[items.length - 1].selected}
          addItem={this.handleItemAdd}
          duplicateItem={() => {
            this.handleItemAdd(
              this.state.items.find(value => value.selected).text
            );
          }}
        />
      </div>
    );
  }
}
