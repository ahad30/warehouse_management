import QRCode from "react-qr-code";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

const PdfSettings = () => {
  return (
    <DashboardBackground>
      <span>PdfSettings</span>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"Md Morshedul Islam"}
          viewBox={`0 0 256 256`}
        />
      </div>

      <div className="flex gap-10">
        <QRCodeSVG
          imageSettings={{
            src: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg",
            width: 50,
            height: 50,
          }}
          value="https://reactjs.org/"
        />

        {/* Right Selection */}
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
    </DashboardBackground>
  );
};

export default PdfSettings;
