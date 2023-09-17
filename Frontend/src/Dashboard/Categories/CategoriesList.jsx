import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { BiSolidDuplicate } from "react-icons/bi";
import CategoryItem from "./CategoryItem";

const CategoriesList = () => {
  const { data, isLoading, isError, error, isSuccess } =
    useGetCategoriesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return console.log(error);
  }
  if (isSuccess && data?.status)
    return (
      <>
        <DashboardBackground>
          <TableHeadingTitle>
            Categories {data?.categories?.length}
          </TableHeadingTitle>

          <SearchAndAddBtn
            btnTitle={"Add Category"}
            btnPath={"/dashboard/category/add"}
            btnIcon={<BiSolidDuplicate size={20} />}
          />

          <div className="overflow-x-auto max-w-[100vw]">
            <table className="table table-sm table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th></th>
                  <td>Category Name</td>
                  <td>Description</td>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.categories?.map((category, idx) => (
                  <CategoryItem key={idx} idx={idx} category={category} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <td>Category Name</td>
                  <td>Description</td>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </DashboardBackground>
      </>
    );
};

export default CategoriesList;
