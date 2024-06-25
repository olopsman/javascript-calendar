
//pass some props to the button
export default function CategoryButton({
    id,
    name,
    fill,
    stroke,
    active,
    updateActiveCategory
}) {

  function handleClick() {
    console.log("click");
  }   

  return (
    <button className={"category-button" + (active ? " on" : "")} 
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