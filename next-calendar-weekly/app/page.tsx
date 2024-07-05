"use client";
import BaseCalendar from "./ui/base-calendar";


// const mapState = ({ eventsData }: { eventsData: any }) => ({
//   events: eventsData.events,
// });

export default function Home() {
  // const { events } = useSelector(mapState);

  //this is data retrieved from the db?
  const calendarEvents:any = [];

  return (
      <BaseCalendar height="100vh" events={calendarEvents} />
  );
}
