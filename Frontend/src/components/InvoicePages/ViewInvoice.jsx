import { bool, func, object } from "prop-types";
import { QRCodeCanvas } from "qrcode.react";
import { useGetCompanyInfoQuery } from "../../features/Settings/settingsApi";

const ViewInvoice = ({ viewInvoiceOpen, setViewInvoiceOpen, invoice }) => {
  const { data: companyInfo } = useGetCompanyInfoQuery();

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
                    Invoice No
                    <span className="text-gray-400">{invoice?.invoice_no}</span>
                  </h5>
                  <p className="text-lg">Date: {invoice?.issue_date}</p>
                </div>
                <div>
                  <img
                    className="w-28"
                    src={
                      companyInfo?.company_info?.company_logo
                        ? `${
                            import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                          }/uploads/companyInfo/${
                            companyInfo?.company_info?.company_logo
                          }`
                        : "https://z8tech.dev/wp-content/uploads/2022/11/tras_ZL-01-removebg-preview.png"
                    }
                    alt={companyInfo?.company_info?.company_logo}
                  />
                </div>
                <div className="text-[#84878B] text-right">
                  <address className="space-y-2">
                    <p>{companyInfo?.company_info?.company_address}</p>
                    <p>{companyInfo?.company_info?.company_phone}</p>
                    <p>{companyInfo?.company_info?.company_email}</p>
                  </address>
                </div>
              </div>

              {/* Invoice to */}
              <div className="flex justify-between items-center border-b-2 pb-5 my-5">
                <div>
                  <h5 className="text-xl font-bold">Invoiced To</h5>
                  <div className="text-[#84878B]">
                    <h5>{invoice?.customer?.name}</h5>
                    <p>{invoice?.customer?.phone}</p>
                    <p>{invoice?.customer?.email}</p>
                    <p>{invoice?.customer?.address} </p>
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
                      <th className="text-sm font-extrabold">Price</th>
                      <th className="text-sm font-extrabold">Quantity</th>
                      <th className="text-sm font-extrabold">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {invoice?.saleitems?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{item?.name}</td>
                          <td>{item?.rate}</td>
                          <td>{item?.quantity}</td>
                          <td>{item?.rate * item?.quantity}</td>
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
                    <span className="text-gray-500 text-lg">
                      {invoice?.sub_total}
                    </span>
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
                  <p className="flex justify-between items-center text-[#383FE1] font-bold">
                    <span className="text-bold text-xl text-right">
                      Due:
                    </span>
                    <span className=" text-lg">{invoice?.due}</span>
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
