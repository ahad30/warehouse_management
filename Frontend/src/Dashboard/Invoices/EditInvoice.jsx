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
      setValue("total", invoice?.total || "");
      setValue("paid_amount", invoice?.paid_amount || "");
      setValue("due_amount", invoice?.due_amount || "");
    }
  }, [invoice, setValue]);

  const onSubmit = (data) => {
    updateInvoice({ ...data, id: invoice?.id });
  };

  useEffect(() => {
    if (updateIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

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
                    <label className="input-group">
                      <span className="font-semibold">
                        Total<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="number"
                        placeholder="Total"
                        className="input input-bordered w-full"
                        {...register("total")}
                        readOnly
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Paid<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="number"
                        placeholder="Paid Amount"
                        className="input input-bordered w-full"
                        {...register("paid_amount")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Due<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="number"
                        placeholder="Due"
                        className="input input-bordered w-full"
                        {...register("due_amount")}
                        readOnly
                      />
                    </label>
                  </div>

                  <div className="items-center gap-2 mt-3 sm:flex">
                    <input
                      type="submit"
                      value={"Update"}
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
