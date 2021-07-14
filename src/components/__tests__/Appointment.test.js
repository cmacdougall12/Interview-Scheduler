import React from "react";

import { render, cleanup } from "@testing-library/react";

import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";

afterEach(cleanup);

//Components render without crashing
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


it("Status renders without crashing", () => {
  render(<Status />);
});
