import CategoryButton from "./CategoryButton";

export default function CategoryButtons({items}) {
    return (
        <div className="category-buttons">
        <CategoryButton id="1" name="Category 1" fill="red" stroke="black" active={true} />
        <CategoryButton id="2" name="Category 2" fill="blue" stroke="black" active={false} />
        <CategoryButton id="3" name="Category 3" fill="green" stroke="black" active={false} />
        </div>
    );
}