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
    <article className="w-full mb-10 border-b border-b-gray-300 grid grid-cols-2 md:flex justify-start gap-y-4  gap-x-1 lg:gap-x-8 items-center  my-2">
      {categoriesArr.map((category, index) => (
        <button
          key={"category-" + index + "-" + category}
          type="button"
          onClick={() => setCategoryLink(category)}
          className={
            categoryLink === category
              ? "bg-inherit text-black border-b-2 border-b-black font-semibold text-left md:text-center text-[0.8rem] md:sm"
              : "bg-inherit text-black text-left md:text-center text-[0.8rem] md:sm"
          }
        >
          {labels[index]}
        </button>
      ))}
    </article>
  );
};

export default CustomCategoryButton;