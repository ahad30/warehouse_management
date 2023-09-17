import { QRCodeCanvas } from "qrcode.react";

const InvoiceA4 = () => {
  return (
    // <div className="w-[2480px] h-[3508px] border p-5">
    <div className="max-w-full p-5">
      {/* Invoice from */}
      <div className="flex justify-between items-center border-b-2 pb-5 my-5">
        <div>
          <h5 className="text-2xl font-bold">
            Invoice No <span className="text-gray-400">#1909112</span>
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
            <p>Bahaddar Hat, Chittagong</p>
            <p>+8801876320043</p>
            <p>z8techh@gmail.com</p>
          </address>
        </div>
      </div>

      {/* Invoice to */}
      <div className="flex justify-between items-center border-b-2 pb-5 my-5">
        <div>
          <h5 className="text-xl font-bold">Invoiced To</h5>
          <div className="text-[#84878B]">
            <h5>John Doe</h5>
            <p>1474 Avenue Kwame, </p>
            <p>+1 (226) 50 272383</p>
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
            value="https://reactjs.org/"
          />
        </div>
        <div className="text-[#84878B] text-right">
          <address className="space-y-2">
            <p>NKRUMAH 10 BP 13395</p>
            <p>10 Ouagadougou, Burkina Faso</p>
            <p>finance@lizetransport.com</p>
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
            <span className="text-bold text-xl text-right">Subtotal:</span>
            <span className="text-gray-500 text-lg">16000.00</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="text-bold text-xl text-right">Grand Total:</span>
            <span className="text-gray-500 text-lg">16000.00</span>
          </p>
          <p className="flex justify-between items-center text-[#383FE1] font-bold">
            <span className="text-bold text-xl text-right">Grand Total:</span>
            <span className=" text-lg">16000.00</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceA4;
