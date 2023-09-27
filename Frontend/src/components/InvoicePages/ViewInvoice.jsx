import { bool, func, object } from "prop-types";
import { QRCodeCanvas } from "qrcode.react";

const ViewInvoice = ({ viewInvoiceOpen, setViewInvoiceOpen, invoice }) => {
  return viewInvoiceOpen ? (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setViewInvoiceOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative max-w-7xl p-4 mx-auto bg-white rounded-md shadow-lg">
          {/* Invoice view section start */}
          <div>
            <div className="max-w-full p-5">
              {/* Invoice from */}
              <div className="flex justify-between items-center border-b-2 pb-5 my-5">
                <div>
                  <h5 className="text-2xl font-bold">
                    Invoice No{" "}
                    <span className="text-gray-400">{invoice.invoice_no}</span>
                  </h5>
                  <p className="text-lg">Date: 17/09/2023</p>
                </div>
                <div>
                  <img
                    className="w-28"
                    src="https://z8tech.dev/wp-content/uploads/2022/11/tras_ZL-01-removebg-preview.png"
                    alt=""
                  />
                </div>
                <div className="text-[#84878B] text-right">
                  <address className="space-y-2">
                    <p>{invoice?.company_address}</p>
                    <p>{invoice?.company_phone}</p>
                    <p>{invoice?.company_email}</p>
                  </address>
                </div>
              </div>

              {/* Invoice to */}
              <div className="flex justify-between items-center border-b-2 pb-5 my-5">
                <div>
                  <h5 className="text-xl font-bold">Invoiced To</h5>
                  <div className="text-[#84878B]">
                    <h5>{invoice?.customer_name}</h5>
                    <p>{invoice?.customer_phone}</p>
                    <p>{invoice?.customer_address} </p>
                  </div>
                </div>
                <div className="flex gap-10 w-20">
                  <QRCodeCanvas
                    size={70}
                    imageSettings={{
                      src: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
                      width: 25,
                      height: 25,
                    }}
                    value={invoice?.invoice_no}
                  />
                </div>
                <div className="text-[#84878B] text-right">
                  <address className="space-y-2">
                    <h5>{invoice?.customer_name}</h5>
                    <p>{invoice?.customer_phone}</p>
                    <p>{invoice?.customer_address} </p>
                  </address>
                </div>
              </div>

              {/* Items */}
              <div>
                <table className="table table-zebra border rounded-lg">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="text-sm font-extrabold">#</th>
                      <th className="text-sm font-extrabold">Item Name</th>
                      <th className="text-sm font-extrabold">Description</th>
                      <th className="text-sm font-extrabold">Rate</th>
                      <th className="text-sm font-extrabold">Quantity</th>
                      <th className="text-sm font-extrabold">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {[...Array(3)]?.map((itm, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{"Nikon D5600 DSLR"}</td>
                          <td>{"NK9903"}</td>
                          <td>{"Creative Control"}</td>
                          <td>{"5"}</td>
                          <td>{"275000"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Calculation */}
              <div className="flex justify-end">
                <div className="border rounded-lg p-5 my-5 space-y-2 w-[300px]">
                  <p className="flex justify-between items-center">
                    <span className="text-bold text-xl text-right">
                      Subtotal:
                    </span>
                    <span className="text-gray-500 text-lg">16000.00</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-bold text-xl text-right">
                      Discount:
                    </span>
                    <span className="text-gray-500 text-lg">
                      {invoice?.discount}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="text-bold text-xl text-right">
                      Shipping:
                    </span>
                    <span className="text-gray-500 text-lg">
                      {invoice?.shipping}
                    </span>
                  </p>
                  <p className="flex justify-between items-center text-[#383FE1] font-bold">
                    <span className="text-bold text-xl text-right">
                      Grand Total:
                    </span>
                    <span className=" text-lg">{invoice?.total}</span>
                  </p>
                </div>
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

ViewInvoice.propTypes = {
  viewInvoiceOpen: bool,
  setViewInvoiceOpen: func,
  invoice: object,
};

export default ViewInvoice;
