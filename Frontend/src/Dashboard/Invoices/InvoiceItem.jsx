import { number } from "prop-types";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";

const InvoiceItem = ({ index }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>JW4652</td>
      <td>iPhone 14</td>
      <td>5</td>
      <td>25,000</td>
      <td>500</td>
      <td>100</td>
      <td>24600</td>
      <td>16th Aug 2023</td>
      <td>
        <div className="flex items-center gap-x-3">
          <FiEdit className="cursor-pointer" size={18} />{" "}
          <RiDeleteBin4Line className="cursor-pointer" size={18} />
        </div>
      </td>
      <th>{index + 1}</th>
    </tr>
  );
};

InvoiceItem.propTypes = {
  index: number,
};

export default InvoiceItem;
