const Step = ({path}) => {
  const pathName = [
    { name: "Pre installation", path: "/pre-installation" },
    { name: "verification", path: "/verification" },
    { name: "Configuration", path: "/configuration" },
    { name: "final", path: "/final-step" },
  ];

  const handleActiveColor = (item) => {
    const findPath = item === path;
    if (findPath) return "active";
  };

  return (
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
  );
};

export default Step;
