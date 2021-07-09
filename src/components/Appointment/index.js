import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
// import classnames from "classnames";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  let returnElement;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log('interviewer', interviewer)
    props.bookInterview(props.id, interview)
    transition(SHOW);
  }

  if (mode === SHOW) {
    returnElement = <Show time={props.time} interview={props.interview}></Show>;
  }

  if (mode === EMPTY) {
    returnElement = <Empty onAdd={() => transition(CREATE)}></Empty>;
  }

  if (mode === CREATE) {
    returnElement = (
      <Form
        interviewers={props.interviewers}
        onCancel={() => back(CREATE)}
        onSave={save}
      ></Form>
    );
  }
  return (
    <article className="appointment">
      <Header time={props.time} key={props.id}></Header>
      {returnElement}
    </article>
  );
}
