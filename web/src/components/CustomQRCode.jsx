import React, { useEffect, useContext } from "react";
import icon from "../assets/qrLogo.png";
import callAPI from "../utils/API";
import { QRCode } from "react-qrcode-logo";
import { IoIosClose } from "react-icons/io";
import { UserContext } from "../utils/Contexts/UserContext";

const CustomQRCode = ({ qrToken, onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const pollFunction = async () => {
    try {
      if (qrToken != "") {
        let formData = new FormData();
        formData.append("token", qrToken);
        var response = await callAPI({
          endpoint: "/api/v1/auth/password-less/verify",
          method: "POST",
          data: formData,
        });

        if ((response.status = 200)) {
          setUser(response.data["user"]);
        }
      }
    } catch (e) {}
  };
  useEffect(async () => {
    setInterval(pollFunction, 2000);
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
