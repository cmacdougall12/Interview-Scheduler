export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  let appointmentsArray = state.days.filter((ele) => {
    return ele.name === day;
  });

  if (!appointmentsArray[0]) {
    return [];
  }

  appointmentsArray = appointmentsArray[0].appointments;
  let filterAppointment = [];
  appointmentsArray.forEach((element) => {
    filterAppointment.push(state.appointments[element]);
  });
  return filterAppointment;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewInfo = {};
  interviewInfo["interviewer"] = state.interviewers[interview.interviewer];
  interviewInfo["student"] = interview.student;

  return interviewInfo;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  let interviewsArray = state.days.filter((ele) => {
    return ele.name === day;
  });

  if (!interviewsArray[0]) {
    return [];
  }

  interviewsArray = interviewsArray[0].interviewers;
  let filterAppointment = [];
  interviewsArray.forEach((element) => {
    filterAppointment.push(state.interviewers[element]);
  });
  return filterAppointment;
}
