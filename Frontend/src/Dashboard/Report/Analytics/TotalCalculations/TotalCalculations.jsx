const TotalCalculations = () => {
  const items = [
    {
      img: "https://cdn-icons-png.flaticon.com/128/1490/1490853.png",
      count: 499,
      text: "Total Revenue",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/11509/11509409.png",
      count: 77,
      text: "Total Sales",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/3899/3899160.png",
      count: 80,
      text: "Total Products",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/128/1165/1165674.png",
      count: 23,
      text: "Total Customers",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 my-5 p-2">
      {items?.map((item, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row gap-y-5 justify-between items-center py-5 md:py-7 px-3 md:px-5 rounded-xl bg-white shadow-md"
        >
          <div>
            <img className="w-12 h-12" src={item?.img} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-y-2">
            <span className="font-bold text-3xl">{item?.count}</span>
            <span>{item?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalCalculations;
