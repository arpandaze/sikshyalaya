import ReactQuill from "react-quill";
const Quill = ReactQuill.Quill;
var FontAttributor = Quill.import("formats/font");
FontAttributor.whitelist = ["Roboto", "Raleway", "Lato"];
Quill.register(FontAttributor, true);
export const modules = {
  toolbar: [
    [
      { font: FontAttributor.whitelist },
      { size: ["small", false, "large", "huge", { header: "1" }] },
    ],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ script: "sub" }, { script: "super" }],
  ],
};

export const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "background",
  "code",
  "script",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
