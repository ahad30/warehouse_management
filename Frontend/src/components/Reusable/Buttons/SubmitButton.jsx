import { bool, node, string } from "prop-types";

const SubmitButton = ({ title, icon, isLoading }) => {
  return (
    <div className="flex justify-center items-center my-5">
      <div  className="bg-red-500 hover:bg-red-400 flex items-center justify-center text-white focus:ring-1 px-4 py-2 space-x-2 rounded-md">
        <span>{icon}</span>
        <input
          className="cursor-pointer text-lg"
          type="submit"
          value={title}
          disabled={isLoading && isLoading}
        />
      </div>
    </div>
  );
};

SubmitButton.propTypes = {
  title: string,
  icon: node,
  isLoading: bool,
};

export default SubmitButton;
