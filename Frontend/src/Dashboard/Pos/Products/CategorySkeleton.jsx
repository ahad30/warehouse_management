
const CategorySkeleton = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
        <div className="h-[50px] bg-gray-300 rounded-lg dark:bg-gray-300 w-48 mb-4"></div>
        
        <span className="sr-only">Loading...</span>
      </div>
    );
};

export default CategorySkeleton;