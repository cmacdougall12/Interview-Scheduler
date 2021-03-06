import React, { useLayoutEffect, useState} from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem"


export default function DayList(props) {
  
  const listDays = props.days.map((day) =>
  
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

