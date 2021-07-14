import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  // STATE 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // UPDATE SPOTS
  function updateSpots(dayName, days, appointments) {
    const index = state.days.findIndex((ele) => ele.name === state.day);

    const dayObj = days[index];

    let spots = 0;
    for (let id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const newDays = [...days];
    const newDay = { ...dayObj, spots };

    newDays[index] = newDay;

    return newDays;
  }

  // BOOK INTERVIEW
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days });
    });
  }

  //DELETE INTERVIEW
  function deleteInterview(id) {
    const removeInterviewFromAppointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: removeInterviewFromAppointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days});
    
    });
  }

  //RETRIEVE APPLICATION DATA
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
}
