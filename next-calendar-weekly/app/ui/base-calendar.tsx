// import { format } from 'date-fns/format';
// import { getDay } from 'date-fns/getDay';
// import { enUS } from 'date-fns/locale';
// import { parse } from 'date-fns/parse';
// import { startOfWeek } from 'date-fns/startOfWeek';
// import React from 'react'
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useState } from 'react';
// import CreateEventModal from './create-event-modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useMemo } from 'react';

const localizer = momentLocalizer(moment);


// const DragAndDropCalendar = withDragAndDrop(Calendar);
// const locales = {
//   "en-US": enUS,
// };

// let currentDate = new Date();
// let currentDay = currentDate.getDay();

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(currentDate, { weekStartsOn: currentDay }),
//   getDay,
//   locales,
// })

export default function BaseCalendar(props: any) {
  const {defaultDate} = useMemo(() => ({
    defaultDate: new Date(2024, 7, 13)
  }), [])

  // const calendarRef = React.createRef();
  // const formats = {
  //   weekdayFormat: "EEE",
  //   timeGutterFormat: "hh a",
  // };
  // //use state
  // const [openDialog, setOpenDialog] = useState(false);
  // //for dragging and displaying the event
  // const setEventCellStyling = () => {
  //   let style = {
  //     background: "rgba(7, 97, 125, 0.1)",
  //     border: `1px solid #07617D`,
  //     color: "#07617D",
  //     borderLeft: "3px solid #07617D",

  //     fontWeight: 600,
  //     fontSize: "11px",
  //   };
  //   return { style };
  // };

  // const handleSelect = ({ start, end }) => {
  //   const currentDate = new Date();
  //   if (start < currentDate) {
  //     return null;
  //   }
  //   if (start > end) return;

  //   handleOpenPopup();
  //   // dispatch(setEventData({ start, end }));
  // };

  // const handleOpenPopup = () => {
  //   setOpenDialog(true);
  // };  

  // const handleDialogClose = () => {
  //   setOpenDialog(false);
  //   // dispatch(setEventData({}));
  // };


  return (
    <>
    <Calendar
      // defaultDate={defaultDate}
      localizer={localizer}
      events={props.events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
      />

    {/* <Calendar
      localizer={localizer}
      events={props.events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100vh" }}
    /> */}
    {/* <DragAndDropCalendar 
      ref={calendarRef}
      localizer={localizer}
      formats={formats}
      popup={true}
      defaultView={"week"}
      selectable
      resizable
      longPressThreshold={1}
      eventPropGetter={setEventCellStyling}
      onSelectSlot={handleSelect}
      style={{ height: height ? height : "68vh", ...style }}
    />
      
      <CreateEventModal open={openDialog} handleClose={handleDialogClose} /> */}
    </>
  )
}
