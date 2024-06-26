'use client';

//add active prop to ScheduleCategoryButton
export interface ScheduleCategoryButton extends ScheduleCategory {
    active?: boolean;
}

//add updateActiveCategory prop function to ScheduleCategoryButton
// export interface CategoryButtonProps extends ScheduleCategoryButton {
//     updateActiveCategory(entry: ScheduleCategory): void;
// }

export default function CategoryButton({
    id,name,fill,stroke,active
} : ScheduleCategoryButton ) {
    function handleClick(): void {
        // updateActiveCategory({ id, name, fill, stroke });
        console.log("button clicked")
    }

    return (
        <button
      className={"category-button" + (active ? " on" : "")}
      type="button"
      onClick={handleClick}
    >
      <svg x="0" y="0" width="16" height="16" viewBox="0 0 16 16">
        <rect x="0" y="0" width="16" height="16" fill={fill} stroke={stroke} />
      </svg>
      &ensp;{name}
    </button>
    );
}