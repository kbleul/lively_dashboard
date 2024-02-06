const CustomCategoryButton = ({
  categoryLink,
  setCategoryLink,
  categoriesArr,
  labels,
}: {
  categoryLink: string;
  setCategoryLink: React.Dispatch<React.SetStateAction<string>>;
  categoriesArr: string[];
  labels: string[];
}) => {
  return (
    <article className="w-full mb-10 border-b border-b-gray-300 flex justify-start gap-x-10 items-center  my-2">
      {categoriesArr.map((category, index) => (
        <button
          key={"category-" + index + "-" + category}
          type="button"
          onClick={() => setCategoryLink(category)}
          className={
            categoryLink === category
              ? "bg-inherit text-black border-b-2 border-b-black font-semibold"
              : "bg-inherit text-black"
          }
        >
          {labels[index]}
        </button>
      ))}
    </article>
  );
};

export default CustomCategoryButton;
