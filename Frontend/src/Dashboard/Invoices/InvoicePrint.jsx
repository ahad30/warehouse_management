import { object } from "prop-types";
import { QRCodeCanvas } from "qrcode.react";


const InvoicePrint = ({invoice,companyInfo,defaultSettings}) => {
    console.log(defaultSettings)
    return (
        <div>
            {/* start */}
          <div  className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
            //   onClick={() => setViewInvoiceOpen(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative max-w-7xl p-4 mx-auto bg-white rounded-md shadow-lg">
                {/* Invoice view section start */}
                <div>
                  <div className="md:min-w-[700px] relative  min-h-screen max-w-full p-5">
                    {/* Invoice from */}
                    <div className="flex justify-between items-center border-b-2 pb-5 my-5">
                      <div>
                        <img
                          className="w-28"
                          src={
                            companyInfo?.company_info?.company_img
                              ? `${
                                  import.meta.env
                                    .VITE_REACT_APP_PUBLIC_IMAGE_PORT
                                }/uploads/companyInfo/${
                                  companyInfo?.company_info?.company_img
                                }`
                              : "https://z8tech.dev/wp-content/uploads/2022/11/tras_ZL-01-removebg-preview.png"
                          }
                          alt={companyInfo?.company_info?.company_img}
                        />
                      </div>
                      <div>
                        <h5 className="text-2xl font-bold">
                          Invoice:
                          <span className="text-gray-400">
                            {" "}
                            {invoice?.invoice_no}
                          </span>
                        </h5>
                        <p className="text-lg">Date: {invoice?.issue_date}</p>
                      </div>
                    </div>

                    {/* Invoice to */}
                    <div className="flex justify-between items-center border-b-2 pb-5 my-5">
                      <div>
                        <h5 className="text-xl font-bold ">Invoice From</h5>
                        <div className="text-[#84878B] ">
                          <p>{companyInfo?.company_info?.company_name}</p>
                          <p>{companyInfo?.company_info?.company_email}</p>
                          <p>{companyInfo?.company_info?.company_phone}</p>
                          <p>{companyInfo?.company_info?.company_address}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xl font-bold text-right">
                          Invoice To
                        </h5>
                        <div className="text-[#84878B] text-right">
                          <h5>{invoice?.customer?.name}</h5>
                          <p>{invoice?.customer?.phone}</p>
                          <p>{invoice?.customer?.email}</p>
                          <p>{invoice?.customer?.address} </p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <table className="table table-zebra border rounded-lg">
                        {/* head */}
                        <thead>
                          <tr>
                            <th className="text-sm font-extrabold">#</th>
                            <th className="text-sm font-extrabold">
                              Item Name
                            </th>
                            <th className="text-sm font-extrabold">Price</th>
                            <th className="text-sm font-extrabold">Quantity</th>
                            <th className="text-sm font-extrabold">
                              {defaultSettings?.settings?.taxation || "Tax"}%
                            </th>
                            <th className="text-sm font-extrabold">
                              Total Price
                            </th>
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
                                <td>{item?.tax}%</td>
                                <td>{item?.total_price_quantity_tax}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>


                    {/* Calculation  footer note*/}
                    <div className=" absolute bottom-12 right-5 left-2  w-full  mt-28">
                     

                     {/* total */}
                     <div className="flex justify-between">
                     <div className="flex items-center gap-5 w-20">
                        <QRCodeCanvas
                          size={70}
                          value={`${invoice?.invoice_no} at ${invoice?.issue_date} for ${invoice?.customer?.name}`}
                        />
                        <p
                          className={`font-semibold text-xl rounded-lg  px-3 py-1 ${
                            invoice?.status === 0
                              ? "text-[#DC2626]"
                              : "text-[#16A34A]"
                          }`}
                        >
                          {invoice?.status === 0 ? "Due" : "Paid"}
                        </p>
                      </div>
                      <div className="border rounded-lg p-5 my-5 space-y-2 w-[300px]">
                        <p className="flex justify-between items-center">
                          <span className="text-bold text-xl text-right">
                            Subtotal:
                          </span>
                          <span className="text-gray-500 text-lg">
                            {defaultSettings?.settings?.currency}
                            {invoice?.sub_total}
                          </span>
                        </p>
                        <p className="flex justify-between items-center">
                          <span className="text-bold text-xl text-right">
                            Discount:
                          </span>
                          <span className="text-gray-500 text-lg">
                            {invoice?.discount}%
                          </span>
                        </p>
                        <p className="flex justify-between items-center">
                          <span className="text-bold text-xl text-right">
                            Shipping:
                          </span>
                          <span className="text-gray-500 text-lg">
                            {defaultSettings?.settings?.currency}

                            {invoice?.shipping}
                          </span>
                        </p>
                        <p className="flex justify-between items-center text-[#383FE1] font-bold">
                          <span className="text-bold text-xl text-right">
                            Total:
                          </span>
                          <span className=" text-lg">
                            {defaultSettings?.settings?.currency}{" "}
                            {invoice?.total}
                          </span>
                        </p>
                        <p className="flex justify-between items-center text-[green] font-bold">
                          <span className="text-bold text-xl text-right">
                            Paid:
                          </span>
                          <span className=" text-lg">
                            {defaultSettings?.settings?.currency}{" "}
                            {invoice?.paid_amount}
                          </span>
                        </p>
                        <p className="flex justify-between items-center text-[red] font-bold">
                          <span className="text-bold text-xl text-right">
                            Due:
                          </span>
                          <span className=" text-lg">
                            {defaultSettings?.settings?.currency}
                            {invoice?.due_amount}
                          </span>
                        </p>
                      </div>
                     </div>

                      {/* footer */}
                      <div>
                      {defaultSettings?.footer_note && (
                      <p className="text-center pb-7 italic">
                        {defaultSettings?.footer_note}
                      </p>
                    )}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end */}
        </div>
    );
};

InvoicePrint.propTypes = {
    invoice: object,
    companyInfo: object,
    defaultSettings: object,
  };

export default InvoicePrint;