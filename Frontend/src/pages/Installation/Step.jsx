const Step = ({ path }) => {
  const pathName = [
    { name: "Pre Installation", path: "/pre-installation" },
    { name: "Verification", path: "/verification" },
    { name: "Configuration", path: "/configuration" },
    { name: "Final", path: "/final-step" },
  ];

  const handleActiveColor = (item) => {
    const findPath = item === path;
    if (findPath) return "active";
  };

  return (
    <>
      <h2 className="text-center text-5xl font-semibold mb-10">
        Z-Invoice Management Installation
      </h2>
      <ul className="steps w-full mb-12 step">
        {pathName?.map((item, i) => (
          <li
            key={i}
            className={`step mx-2 ${
              handleActiveColor(item.path) === "active" ? "step-primary" : ""
            }`}
          >
            {item?.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Step;
