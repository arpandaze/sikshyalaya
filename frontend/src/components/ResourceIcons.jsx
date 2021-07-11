import React from "react";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import {
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineLink,
  AiOutlineFileZip,
} from "react-icons/ai";
import {
  IoDocumentTextOutline,
  IoDocumentAttachOutline,
} from "react-icons/io5";
import "./statics/css/resourceIcons.css";
const iconList = {
  presentation: (
    <HiOutlinePresentationChartBar className="resourceIcons_iconStyle" />
  ),
  pdf: <AiOutlineFilePdf className="resourceIcons_iconStyle" />,
  image: <AiOutlineFileImage className="resourceIcons_iconStyle" />,
  link: <AiOutlineLink className="resourceIcons_iconStyle" />,
  document: <IoDocumentTextOutline className="resourceIcons_iconStyle" />,
  others: <IoDocumentAttachOutline className="resourceIcons_iconStyle" />,
  zip: <AiOutlineFileZip className="resourceIcons_iconStyle" />,
};

const ResourceIcons = ({ iconType }) => {
  return <div className="resourceIcons_icons">{iconList[iconType]}</div>;
};

export default ResourceIcons;
