const ImportTable = () => {
  const tableData = [
    {
      product_Name: "Apple MacBook Pro",
      color: "Silver",
      category: "Laptop",
      price: 2999,
    },
    {
      product_Name: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop",
      price: 1999,
    },
    {
      product_Name: "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: 99,
    },
  ];
  console.log(tableData);
  return (
    <>
      <div className="mt-8">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((items, idx) => (
                <tr key={idx} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {items.product_Name}
                  </th>
                  <td className="px-6 py-4 text-gray-900 ">{items.color}</td>
                  <td className="px-6 py-4 text-gray-900 ">{items.category}</td>
                  <td className="px-6 py-4 text-gray-900 ">${items.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ImportTable;
