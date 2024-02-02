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
      <button
        type="button"
        onClick={() => setCategoryLink(categoriesArr[0])}
        className={
          categoryLink === categoriesArr[0]
            ? "bg-inherit text-black border-b-2 border-b-black font-semibold"
            : "bg-inherit text-black"
        }
      >
        {labels[0]}
      </button>
      <button
        type="button"
        onClick={() => setCategoryLink(categoriesArr[1])}
        className={
          categoryLink === categoriesArr[1]
            ? "bg-inherit text-black border-b-2 border-b-black font-semibold"
            : "bg-inherit text-black"
        }
      >
        {labels[1]}
      </button>
    </article>
  );
};

export default CustomCategoryButton;
