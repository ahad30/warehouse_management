import { useState } from "react";
import { Link } from "react-router-dom";

const NavTest2 = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Service", link: "/" },
    { name: "Contact", link: "/" },
  ];
  return (
    <div className="bg-gray-100 w-full fixed top-0 left-0 p-3">
      <div className="md:flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <p className="text-xl font-bold">Logo</p>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="md:hidden text-md absolute top-3 right-5"
        >
          <button>{open ? "=" : "x"}</button>
        </div>
        <div>
          <ul
            className={`md:flex md:items-center bg-white w-full md:w-auto md:pb-0 pb-12 absolute md:static md:pl-0 pl-9 md:z-auto z-[-1] left-0 transition-all ease-in duration-500 ${
              open ? "top-20" : "top-[-490px]"
            }`}
          >
            {links.map((link) => (
              <li key={link.name} className="ml-5 md:my-0 mt-5">
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavTest2;
