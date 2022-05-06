import React, { useEffect } from "react";
import icon from "../assets/qrLogo.png";
import callAPI from "../utils/API";
import { QRCode } from "react-qrcode-logo";
import { IoIosClose } from "react-icons/io";

const CustomQRCode = ({ qrToken, onClose }) => {
  const pollFunction = async () => {
    try {
      await callAPI({
        endpoint: "/api/v1/auth/password-less/verify",
        method: "POST",
        data: { token: qrToken },
      });
    } catch (e) {}
  };
  useEffect(async () => {
    setInterval(pollFunction, 1000);
  }, [qrToken]);
  return (
    <div className="loginCommon_qrPopUp">
      <IoIosClose onClick={onClose} className="loginCommon_qrCodeClose" />
      <QRCode
        value={qrToken}
        logoImage={icon}
        logoWidth={75}
        className="loginCommon_qrCode"
        size={250}
      />
      <div className="loginCommon_qrCodeText">
        Login with the QR Code
        <div className="loginCommon_qrCodeText2">
          Scan this with the Sikshyalya mobile app to log in instantly.
        </div>
      </div>
    </div>
  );
};
export default CustomQRCode;
