import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment//Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

//create modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

//Appointment component transistions to required modes depending on user input
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //save - used to save new appointment or existing
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((response) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  //delete - used to delete existing appointment
  function saveDelete() {
    transition(DELETING);
    props
      .deleteInterview(props.id)
      .then((response) => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }

  //confirmDelete - asks user to confirm deletion
  function confirmDelete() {
    transition(CONFIRM);
  }

  //return element based on MODE
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} key={props.id}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}></Empty>}
      {mode === SAVING && <Status message={"Saving..."}></Status>}
      {mode === DELETING && <Status message={"Deleting..."}></Status>}
      {mode === SHOW && (
        <Show
          time={props.time}
          interview={props.interview}
          onDelete={confirmDelete}
          onEdit={() => transition(EDIT)}
        ></Show>
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={saveDelete}
          onCancel={() => transition(SHOW, true)}
          message={"Are you sure you would like to delete?"}
        ></Confirm>
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        ></Form>
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          onCancel={back}
          onSave={save}
        ></Form>
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={"Error encountered when deleting. Please try again"}
          onClose={back}
        ></Error>
      )}

      {mode === ERROR_SAVE && (
        <Error
          message={"Error encountered when saving. Please try again"}
          onClose={back}
        ></Error>
      )}
    </article>
  );
}
