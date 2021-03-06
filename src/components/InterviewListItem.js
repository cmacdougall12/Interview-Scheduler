import React from "react";
import "components/InterviewListItem.scss";
import classnames from "classnames";

export default function InterviewListItem(props) {
  const interviewClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
