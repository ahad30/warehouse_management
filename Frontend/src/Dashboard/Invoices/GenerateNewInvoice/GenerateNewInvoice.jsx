import { useForm } from "react-hook-form";

const GenerateNewInvoice = () => {
  const { handleSubmit, register } = useForm();

  const formSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(formSubmitHandler)}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GenerateNewInvoice;
