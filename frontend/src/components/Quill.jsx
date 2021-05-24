import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./statics/css/quill.css";
import { modules, formats } from "../utils/quillConfig";
const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
Quill.register(Font, true);

const ops = [{ insert: "Hi" }];
const Ed = () => {
  const [value, setValue] = useState(new Delta(ops));

  const handleChange = (content, delta, source, editor) => {
    setValue(editor.getContents());
  };

  useEffect(() => {
    console.log(JSON.stringify(value.ops));
  }, [value]);

  return (
    <ReactQuill
      theme="snow"
      className="quillNotes"
      modules={modules}
      format={formats}
      value={value}
      onChange={(content, delta, source, editor) => {
        handleChange(content, delta, source, editor);
      }}
    />
  );
};
export default Ed;
