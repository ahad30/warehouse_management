import { node, string } from "prop-types";

const SubmitButton = ({ title, icon }) => {
  return (
    <div className="flex justify-center items-center my-5 cursor-pointer">
      <div className="flex items-center gap-x-2 btn btn-primary w-full sm:w-fit ">
        <span>{icon}</span>
        <input className="cursor-pointer text-lg" type="submit" value={title} />
      </div>
    </div>
  );
};

SubmitButton.propTypes = {
  title: string,
  icon: node,
};

export default SubmitButton;
