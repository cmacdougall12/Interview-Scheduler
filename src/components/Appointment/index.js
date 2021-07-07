import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
// import classnames from "classnames";

export default function Appointment(props) {
  let returnElement;
  props.interview
    ? (returnElement = (
        <article className="appointment">
          <Header time={props.time} key={props.id}></Header>

          <Show
            key={props.id}
            time={props.time}
            interview = {props.interview}
          ></Show>
        </article>
      ))
    : (returnElement = (
        <article className="appointment">
          <Header time={props.time} key={props.id}></Header>
          <Empty></Empty>
        </article>
      ));
  console.log(returnElement);
  return returnElement;
}
