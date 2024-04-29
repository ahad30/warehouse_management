import { array, string } from "prop-types";

const Histories = ({ histories, extraData }) => {
  // console.log(histories)
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Product Code
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              From
            </th>
            <th scope="col" className="px-6 py-3">
              to
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>

            <th scope="col" className="px-6 py-3">
              By
            </th>
            
          </tr>
        </thead>
        <tbody>
          {histories?.length > 0 ? (
            histories?.map((history, index) => (
              <tr className="bg-white border-b " key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <th scope="col" className="px-6 py-3">
                  {extraData
                    ? extraData?.product_name
                    : history?.products?.product_name}
                </th>
                <th scope="col" className="px-6 py-3">
                  {extraData
                    ? extraData?.scan_code
                    : history?.products?.scan_code}
                </th>
                <td scope="col" className="px-6 py-3">
                  {history?.products?.get_category?.category_name}
                </td>
                <td scope="col" className="px-6 py-3">
                  {history?.products?.get_brand?.brand_name}
                </td>

                {/* d */}
                <td className="px-6 py-4">
                  {history?.from_warehouse_id?.name}
                </td>
                <td className="px-6 py-4"> {history?.to_warehouse_id?.name}</td>
                <td className="px-6 py-4">{history?.products?.product_retail_price}</td>
                <td className="px-6 py-4">{history?.created_at}</td>
                <td className="px-6 py-4">{history?.user?.name}</td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b ">
              <th
                scope="row"
                colSpan={4}
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
              >
                No data yet
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Histories;
Histories.propTypes = {
  histories: array,
  extraData: string,
};
