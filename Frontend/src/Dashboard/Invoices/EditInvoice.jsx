import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useUpdateInvoiceMutation } from "../../features/Invoice/InvoiceApi";

const EditInvoice = ({ modalIsOpen, setModalIsOpen, invoice }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [
    updateInvoice,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateInvoiceMutation();

  // Set default values using setValue from react-hook-form
  useEffect(() => {
    if (invoice) {
      setValue("paid_amount", invoice?.due_amount || "");
    }
  }, [invoice, setValue]);

  const onSubmit = (data) => {
    if (!data?.paid_amount) {
      toast.error("Please Add Due Amount", { id: 1 });
    } else if (data?.paid_amount) {
      updateInvoice({ ...data, invoice_id: invoice?.id });
    }
  };

  useEffect(() => {
    if (updateIsError) {
      toast.error(updateError?.data?.message || updateError?.status, { id: 1 });
    }

    if (updateIsSuccess) {
      toast.success(updateData?.message, { id: 1 });
      setModalIsOpen(false);
    }
  }, [
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData?.message,
    setModalIsOpen,
  ]);

  return modalIsOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setModalIsOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <p className="text-lg font-semibold text-center mb-5">
                Update Invoice
              </p>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-5 w-full">
                    <label htmlFor="">
                      Current Due Amount
                      <input
                        type="text"
                        placeholder="New Paid Amount"
                        className="input input-bordered w-full"
                        disabled={
                          parseFloat(invoice?.due_amount).toFixed(2) <= 0
                        }
                        {...register("paid_amount")}
                      />
                    </label>
                  </div>

                  <div className="items-center gap-2 mt-3 sm:flex">
                    <input
                      type="submit"
                      value={updateIsLoading ? "Updating" : "Update"}
                      disabled={updateIsLoading}
                      className="cursor-pointer w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                    />

                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => setModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

EditInvoice.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  invoice: object,
};

export default EditInvoice;
