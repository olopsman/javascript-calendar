import { useState, useEffect } from "react";
import scheduleCategories from "../lib/schedule-categories";
import CategoryButtons from "./CategoryButtons";
import type { ScheduleCategoryButton } from "./CategoryButton";
import Guidelines from "./Guidelines";
import { joinSchedules, updateSchedules, joinSchedulesOnUpdate, addTrash, convertSchedules } from "../lib/utils";
import NewScheduleTrack from "./NewScheduleTrack";
import Schedules from "./Schedules";


function initailCategories(): ScheduleCategoryButton[] {
    const categories: ScheduleCategoryButton[] = [...scheduleCategories];
    categories[0].active = true;
  
    for (let i = 1; i < categories.length; i++) {
      categories[i].active = false;
    }
  
    return categories;
  }
  

export default function DailyScheduler(props: {
    schedules?: Schedule[];
}): JSX.Element {
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
    const [categories, setCategories] = useState(initailCategories);
    const [activeCategory, setActiveCategory] = useState(categories[0]); 

    function addSchedule(schedule: ScheduleItem): void {
        const ss = joinSchedules([...schedules, schedule]);
        setSchedules(ss);
      }

      useEffect(() => {
        updateSchedules(schedules);
      }, [schedules]);
    
    function updateActiveCategory(category: ScheduleCategory): void {
        const length = categories.length;
        const cc = new Array(length);
    
        for (let i = 0; i < length; i++) {
          cc[i] = categories[i];
          cc[i].active = cc[i].id === category.id;
        }
    
        setCategories(cc);
        setActiveCategory(category);
      }

    function updateSchedule(schedule: ScheduleItemIndexable): void {
        const ss = joinSchedulesOnUpdate(schedule);
        setSchedules(ss);
    }  

    function removeSchedule(index: number): void {
        addTrash(schedules[index]);
        schedules.splice(index, 1);
        setSchedules([...schedules]);
      }

      return (
        <div className="daily-scheduler">
          <CategoryButtons
            items={categories}
            updateActiveCategory={updateActiveCategory}
          />
          <div className="track">
            <Guidelines />
            <NewScheduleTrack category={activeCategory} addSchedule={addSchedule} />
            <Schedules
          items={schedules}
          updateSchedule={updateSchedule}
          removeSchedule={removeSchedule}
        />
        </div>
        </div>
      );
}