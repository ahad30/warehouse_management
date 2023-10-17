import { bool, node, string } from "prop-types";

const SubmitButton = ({ title, icon, isLoading }) => {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="flex items-center gap-x-2 btn btn-primary w-full sm:w-fit ">
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
