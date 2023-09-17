import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useGetProductsQuery } from "../../features/Product/productApi";

const ProductsList = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetProductsQuery();

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
            Products {data?.products?.length}
          </TableHeadingTitle>
        </DashboardBackground>
      </>
    );
};

export default ProductsList;
