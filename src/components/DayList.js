import React, { useLayoutEffect, useState} from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem"


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function DayList(props) {
  
  const listDays = days.map((day) =>
  
      <DayListItem
      key = {day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      />
    );
  return <ul>{listDays}</ul>;
}

