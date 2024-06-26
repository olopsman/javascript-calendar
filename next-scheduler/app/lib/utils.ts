import categories from "./schedule-categories";

const LEFT = 1; // ID to define the left side of schedule item
const RIGHT = 2; // ID to define the left side of schedule item
const DEFAULT_HOUR_START = 0; // default starting hour of scheduler

let hour1 = 0; // starting hour in the scheduler
let hour2 = 0; // ending hour in the scheduler

let step = 2; // number of steps the schedule to be snapped to in a hour. "step = 2" means you can enter each schedule by 30 minutes.

let date1: Date; // date of starting hour
let date2: Date; // date of ending hour, that is "date1 + 1-day"
let date1String: string; // date string of "date1" in ISO format, e.x. "2024-01-01"
let date2String: string; // date string of "date2" in ISO format

let dragging: boolean; // whether a user is dragging or not

let o: number; // horizontal coordinate of left side of track element within the application's viewport
let x1: number | null; // horizontal coordinate(clientX) of mousedown event

let schedules: ScheduleItem[]; // list of schedule items
let trash: number[] = []; // list of IDs of deleted schedules

let dragPosition: 1 | 2 | null; // left or right side of schedule item when the user triggers "mousedown" event 
let guides: number[]; // list of "offsetLeft", relative to the parent track element, that schedule items must snap to.
let datetimes: string[]; // list of datetime strings corresponding to the "guides", e.x. ["2024-01-01 00:00", "2024-01-01 00:30", …]

let hours: number[]; // list of hours to be drawn, e.x. [0, 1, 2, …, 0];

let minX: number | null; // minimum horizontal coordinate that a schedule item can extend
let maxX: number | null; // maximum horizontal coordinate that a schedule item can extend

export const initialSchedules = [
  {
    id: 1,
    start: "2024-01-01 00:00:00",
    end: "2024-01-01 07:00:00",
    category_id: 1,
  },
  {
    id: 2,
    start: "2024-01-01 09:00:00",
    end: "2024-01-01 12:30:00",
    category_id: 2,
  },
];

export function init(dateString: string, hour: number): void {
  setHours(hour);
  setDate(dateString);
  setDatetimes();
  emptyTrash();
}

export function setHours(hour: number): void {
  hour1 = hour2 = hour | DEFAULT_HOUR_START; //chaining of assignments 

  const diff = 24 - hour1;
  const length = diff + hour2 + 1;
  console.log(length)
  let t = hour1;
  let i: number;
  hours = new Array(length);

  function appendHour(): void { //why is this not an arrow function?
    hours[i] = t;
    t++;
  }

  for (i = 0; i < diff; i++) appendHour();

  t = 0;

  for (; i < length; i++) appendHour();
}

export function setDate(dateString: string): void {
  date1 = new Date(dateString);
  date2 = new Date(date1.getTime() + 86400000); // 1000 * 3600 * 24
  date1String = date1.toISOString().substring(0, 10);
  date2String = date2.toISOString().substring(0, 10);
}

export function setDatetimes(): void {
  const length = hours.length * step - step + 1;
  const hoursLastIndex: number = hours.length - 1;
  let i: number = 0;
  let j: number;
  let k: number;
  let d: Date;

  datetimes = new Array(length);

  function createDateTimeString(dateString: string) {
    return dateString + " " + d.toISOString().substring(11, 19);
  }

  function fillStep(dateString: string) {
    d = new Date(3600000 * (hours[i] + k / step));
    datetimes[j + k] = createDateTimeString(dateString);
  }

  function fillHour(dateString: string) {
    j = i * step;

    for (k = 0; k < step; k++) fillStep(dateString);
  }

  fillHour(date1String);

  for (i = 1; hours[i] !== 0; i++) fillHour(date1String);
  for (; i < hoursLastIndex; i++) fillHour(date2String);

  j = i * step;
  k = 0;

  fillStep(date2String);
}

export function emptyTrash(): void {
  trash = [];
}

export function getHours(): number[] {
  return hours;
}

export function setO(x: number): void {
  o = x;
}

export function setGuides(element: HTMLDivElement): void {
  const length: number = hours.length * step - step + 1;
  const hoursLastIndex: number = hours.length - 1;
  const lines: NodeListOf<HTMLSpanElement> =
    element.querySelectorAll(".guideline");
  let i: number, j: number, k: number;
  let x: number, diff: number;

  guides = new Array(length);

  if (step === 1) {
    for (let i = 0; i < length; i++) guides[i] = lines[i].offsetLeft;

    return;
  }

  function fillStep() {
    guides[j + k] = x + Math.round((diff * k) / step);
  }

  function fillInHour() {
    j = i * step;
    x = lines[i].offsetLeft;
    diff = lines[i + 1].offsetLeft - x;

    for (k = 0; k < step; k++) fillStep();
  }

  for (i = 0; i < hoursLastIndex; i++) fillInHour();

  guides[length - 1] = lines[hoursLastIndex].offsetLeft;
}

export function dragStart(x: number): void {
  setDragging(true);
  setX1(x);
}

export function dragEnd(): void {
  setDragging(false);
  setX1(null);
  setDragPosition(null);
  clearHorizon();
}

export function setDragging(boo: boolean): void {
  dragging = boo;
}

export function setX1(x: number | null): void {
  if (x === null) {
    x1 = null;

    return;
  }

  x1 = o + snapToGuide(x - o);
}

export function snapToGuide(x: number): number {
  let i = 0;
  let diff1 = Math.abs(x - guides[0]);
  let diff2 = Math.abs(x - guides[1]);

  while (diff1 > diff2) {
    i++;
    diff1 = diff2;
    diff2 = Math.abs(x - guides[i + 1]);
  }

  return guides[i];
}

export function setDragPosition(n: 1 | 2 | null): void {
  dragPosition = n;
}

function clearHorizon(): void {
  minX = null;
  maxX = null;
}

export function getStartAndEndOnGrid(x2: number): {
  start: number;
  end: number;
} {
  x1 = x1 as number;
  x2 = o + snapToGuide(x2 - o);

  let start: number;
  let end: number;
  const dx = x2 - x1;

  if (dx > 0) {
    start = x1 - o;
    end = Math.min(x2 - o, maxX as number);
  } else {
    start = Math.max(x2 - o, minX as number);
    end = x1 - o;
  }

  return { start, end };
}

export function canAddSchedule(x: number): boolean {
  let boo = true;

  if (schedules.length === 0) return boo;

  const start = x - o;

  for (let i = 0; i < schedules.length; i++) {
    if (start >= schedules[i].start && start <= schedules[i].end) {
      boo = false;
      break;
    }
  }

  return boo;
}

export function setHorizonOnGrid(x: number): void {
  minX = 0;
  maxX = guides[guides.length - 1];

  if (schedules === null || schedules.length === 0) return;

  const start = x - o;

  for (let i = 0; i < schedules.length; i++) {
    if (start >= schedules[i].end && minX <= schedules[i].end)
      minX = schedules[i].end;
    if (start <= schedules[i].start && maxX >= schedules[i].start)
      maxX = schedules[i].start;
  }
}

export function joinSchedules(ss: ScheduleItem[]): ScheduleItem[] {
  for (let i = ss.length - 1; i > 0; i--) {
    const s1 = ss[i];

    for (let j = i - 1; j > -1; j--) {
      const s2 = ss[j];

      if (s1.category_id !== s2.category_id) continue;
      if (s1.end === s2.start) {
        ss[j].start = s1.start;
        addTrash(s1);
        ss.pop();
        break;
      } else if (s1.start === s2.end) {
        ss[j].end = s1.end;
        addTrash(s1);
        ss.pop();
        break;
      }
    }
  }

  return ss;
}

export function addTrash(schedule: ScheduleItem): void {
  if (!schedule.id) return;

  trash.push(schedule.id);
}

export function updateSchedules(ss: ScheduleItem[]): void {
  if (ss.length === 0) {
    schedules = [];

    return;
  }

  schedules = ss;
}

export function getSchedules(): Schedule[] {
  const length = schedules.length;

  if (length === 0) return [];

  let s: ScheduleItem;
  const ss: Schedule[] = new Array(length);

  function findIndexStart(guidelineX: number) {
    return guidelineX === s.start;
  }

  function findIndexEnd(guidelineX: number) {
    return guidelineX === s.end;
  }

  for (let i = 0; i < length; i++) {
    s = schedules[i];
    const index1 = guides.findIndex(findIndexStart);
    const index2 = guides.findIndex(findIndexEnd);
    const start = datetimes[index1];
    const end = datetimes[index2];
    ss[i] = { ...s, start, end };
    delete ss[i].category;
  }

  return ss;
}

export function getTrash(): number[] {
  return trash;
}

export function joinSchedulesOnUpdate(
  schedule: ScheduleItemIndexable
): ScheduleItem[] {
  const { index } = schedule;
  let modified = false;

  for (let i = 0; i < schedules.length; i++) {
    if (schedule.category_id !== schedules[i].category_id) continue;
    if (schedule.end === schedules[i].start) {
      schedules[i].start = schedule.start;
      modified = true;
      break;
    }
    if (schedule.start === schedules[i].end) {
      schedules[i].end = schedule.end;
      modified = true;
      break;
    }
  }

  if (modified) {
    addTrash(schedules[index]);
    schedules.splice(index, 1);
  } else {
    const { index, ...newSchedule } = schedule;
    schedules[index] = newSchedule;
  }

  return [...schedules];
}

export function getDragging(): boolean {
  return dragging;
}

export function getStartAndEndOnSchedule(
  start: number,
  end: number,
  x2: number
): { start: number; end: number } {
  x1 = x1 as number;
  minX = minX as number;
  maxX = maxX as number;
  x2 = o + snapToGuide(x2 - o);
  const dx = x2 - x1;

  if (dragPosition === 1) {
    start += dx;

    if (start < minX) start = minX;
    if (start > maxX) start = maxX;
  } else if (dragPosition === 2) {
    end += dx;

    if (end < minX) end = minX;
    if (end > maxX) end = maxX;
  }

  return { start, end };
}

export function setHorizonOnEntry(x: number): void {
  minX = 0;
  maxX = guides[guides.length - 1];

  const start = x - o;
  let c = schedules[0];

  function isCurrent(schedule: ScheduleItem): boolean {
    const _start = schedule.start;
    const _end = schedule.end;

    return start >= _start && start <= _end;
  }

  if (dragPosition === LEFT) {
    for (let i = 0; i < schedules.length; i++) {
      if (isCurrent(schedules[i])) {
        c = schedules[i];
        continue;
      }
      if (start <= schedules[i].start) continue;
      if (minX <= schedules[i].end) minX = schedules[i].end;
    }

    const i = guides.indexOf(c.end);
    maxX = guides[i - 1];
  } else if (dragPosition === RIGHT) {
    for (let i = 0; i < schedules.length; i++) {
      if (isCurrent(schedules[i])) {
        c = schedules[i];
        continue;
      }
      if (start >= schedules[i].end) continue;
      if (maxX >= schedules[i].start) maxX = schedules[i].start;
    }

    const i = guides.indexOf(c.start);
    minX = guides[i + 1];
  }
}

export function convertSchedules(ss: Schedule[]): ScheduleItem[] {
  if (ss.length === 0) return [];

  let s: Schedule;
  const sss = new Array(ss.length);

  function findIndexStart(datetime: string) {
    return datetime === s.start;
  }

  function findIndexEnd(datetime: string) {
    return datetime === s.end;
  }

  function findCategory(c: ScheduleCategory) {
    return c.id === s.category_id;
  }

  for (let i = 0; i < ss.length; i++) {
    s = ss[i];
    delete s.user_id;
    const index1 = datetimes.findIndex(findIndexStart);
    const index2 = datetimes.findIndex(findIndexEnd);
    const start = guides[index1];
    const end = guides[index2];
    const category = categories.find(findCategory);
    sss[i] = { ...s, start, end, category };
  }

  return sss;
}