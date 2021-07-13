import React from "react";

import { render, cleanup } from "@testing-library/react";

import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Header from "components/Appointment/Header";
import index from "components/Appointment/index";
import Status from "components/Appointment/Status";

afterEach(cleanup);

it("Confirm renders without crashing", () => {
  render(<Confirm />);
});

it("Empty renders without crashing", () => {
  render(<Empty />);
});

it("Error renders without crashing", () => {
  render(<Error />);
});

it("Index renders without crashing", () => {
  render(<index />);
});

it("Header renders without crashing", () => {
  render(<Header />);
});

// it("Show renders without crashing", () => {
//   render(<Show student = {"cam"}/>);
// });

it("Status renders without crashing", () => {
  render(<Status />);
});
