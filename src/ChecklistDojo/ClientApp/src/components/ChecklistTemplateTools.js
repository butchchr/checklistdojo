import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default ({
  moveItemUp,
  moveItemDown,
  deleteItem,
  addItem,
  duplicateItem,
  noSelection,
  firstSelected,
  lastSelected
}) => (
  <div className="ChecklistTemplateTools noselect">
    <FontAwesomeIcon icon={faPlus} size={"1x"} onClick={() => addItem("")} />{" "}
    Task <FontAwesomeIcon icon={faFile} size={"1x"} onClick={duplicateItem} />{" "}
    Dubplicate{" "}
    <FontAwesomeIcon
      icon={faArrowUp}
      size={"1x"}
      onClick={moveItemUp}
      className={noSelection || firstSelected ? "disabled" : ""}
    />{" "}
    <span className={noSelection || firstSelected ? "disabled" : ""}>Move</span>{" "}
    <FontAwesomeIcon
      icon={faArrowDown}
      size={"1x"}
      onClick={moveItemDown}
      className={noSelection || lastSelected ? "disabled" : ""}
    />{" "}
    <span className={noSelection || lastSelected ? "disabled" : ""}>Move</span>{" "}
    <FontAwesomeIcon
      icon={faTrash}
      size={"1x"}
      onClick={deleteItem}
      className={noSelection ? "disabled" : ""}
    />{" "}
    <span className={noSelection ? "disabled" : ""}>Delete</span>{" "}
  </div>
);
