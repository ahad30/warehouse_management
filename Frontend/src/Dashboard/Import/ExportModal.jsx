import { bool, func } from "prop-types";
import importImg from "../../../src/assets/import.png";

const ExportModal = ({ modalIsOpen, setModalIsOpen }) => {
  return modalIsOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full  bg-black opacity-40"
        onClick={() => setModalIsOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-5">
        <div className="relative w-full  max-w-lg  p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-2 text-center sm:ml-4 sm:text-left">
            <div className="px-5">
              <h1 className="font-bold text-lg text-center ">
                How to import CSV file ???
              </h1>
              <p className="font-bold text-lg">Step:1</p>
              <ul className="list-decimal px-5">
                <li>
                  Opening a CSV file is simpler than you may think. In almost
                  any text editor or spreadsheet program, just choose File Open
                  and select the CSV file.
                </li>

                <li>
                  On the Data tab, in the Get & Transform Data group, click From
                  Text/CSV.
                </li>
                <li>
                  In the Import Data dialog box, double-click the CSV file you
                  want to import, and click Import.
                </li>
              </ul>
            </div>
            <div className="mt-3 px-4">
              <p className="font-bold text-lg">Step:2</p>
              <img src={importImg} className=" h-full " />
            </div>
            <div className="px-2 mt-1">
              <p className="font-bold text-lg">Step:3</p>
              <ul className="list-decimal px-4">
                <li>
                  Now this is a story all about how, my life got flipped-turned
                  upside down
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-600  mb-8 text-sm lg:p-1 flex text-white rounded-md outline-none border ring-offset-2 ring-red-500 focus:ring-2"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

ExportModal.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
};

export default ExportModal;
