import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

const ReportItem = ({ index }) => {
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>JGAK4654</td>
        <td>16th Aug 2023</td>
        <td>21st Aug 2023</td>
        <td>Paid</td>
        <td>21,000</td>
        <td>New york city.</td>
        <td>
          <div className="flex items-center gap-x-2">
            <FaRegFilePdf className="cursor-pointer" size={18} />
            <FaDownload className="cursor-pointer" size={18} />
            <BsPrinter className="cursor-pointer" size={18} />
            <FiEdit className="cursor-pointer" size={18} />
            <RiDeleteBin4Line className="cursor-pointer" size={18} />
          </div>
        </td>
        <th>{index + 1}</th>
      </tr>
    </>
  );
};

export default ReportItem;
