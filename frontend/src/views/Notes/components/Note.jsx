import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../../../utils/colors";
import { ImCross } from "react-icons/im";
import { FiTrash } from "react-icons/fi";
import { RiSendPlane2Fill } from "react-icons/ri";
import "./statics/css/note.css";
import CustomButton from "../../../components/CustomButton";
import Tag from "./Tag";
import ReactQuill from "react-quill";
import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";
import "./statics/css/quill.css";
import { formats, modules } from "../../../utils/quillConfig";
import IconProvider from "../../../components/IconProvider";

const Note = ({
  noteTime,
  title,
  tags,
  content,
  state,
  onClose,
  onSave,
  onDelete,
  ...rest
}) => {
  const [tagClass, setTagClass] = useState(true);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState(new Delta(content));
  const [stateTag, setStateTag] = useState([]);
  const [isTagCreator, setTagCreator] = useState(false);
  const [inputTag, setInputTag] = useState("");
  useEffect(() => {
    setStateTag(tags);
  }, [tags]);

  useEffect(() => {
    setTagCreator(false);
    setContentText(new Delta(content));
  }, [content]);

  useEffect(() => {
    setTitleText(title);
  }, [title]);

  const handleRemoveTag = (tagValue) => {
    var filtered = stateTag.filter(function (value) {
      return value !== tagValue;
    });
    if (filtered && filtered.length !== 0) {
      setStateTag(filtered);
    } else {
      setStateTag([]);
    }
  };

  const handleCreateTag = () => {
    setInputTag("");
    setTagCreator(!isTagCreator);
  };

  const handleSubmitTag = () => {
    let upperCased = stateTag.map((f) => {
      return f.toUpperCase();
    });
    if (inputTag && !upperCased.includes(inputTag.toUpperCase())) {
      setStateTag((currentTag) => [...currentTag, inputTag]);
      setInputTag("");
      setTagCreator(false);
      setTagClass(true);
    } else {
      setInputTag("");
      setTagClass(false);
      setTimeout(function () {
        setTagClass(true);
      }, 600);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className="note_root"
      wrap="nowrap"
    >
      <Grid item className="note_notePadTop">
        <Grid container direction="row" alignItems="center">
          <Grid item xs={11} className="note_titleTextContainer">
            <input
              type="text"
              className="note_titleText"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
            />
          </Grid>
          <Grid item xs={1} className="note_closeButtonContainer">
            <div className="note_closeButton">
              <ImCross size={18} color={colorscheme.red4} onClick={onClose} />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="note_notePadBot">
        <Grid container direction="column">
          <Grid item className="note_TagCreatorContainer">
            <Grid
              container
              direction="row"
              alignItems="center"
              className="note_TagCreatorInside"
            >
              <Grid item className="note_tagIconContainer">
                <IconProvider addStyles="note_TagIcon" iconType="tags" />
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  className="note_tagListContainer"
                >
                  {stateTag &&
                    stateTag.map((tagValue, index) => (
                      <Grid item className="note_tag" key={index}>
                        <Tag
                          key={index}
                          tagName={tagValue}
                          onDelete={handleRemoveTag}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Grid item>
                {isTagCreator ? (
                  <Grid item>
                    <input
                      type="text"
                      placeholder="Enter tag"
                      value={inputTag}
                      className="note_tagAddInput"
                      onChange={(e) => setInputTag(e.target.value)}
                    />
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
              <Grid item>
                <CustomButton
                  name="+"
                  addStyles={
                    tagClass ? "note_tagPlusButton" : "note_tagErrorButton"
                  }
                  onClicked={() =>
                    isTagCreator ? handleSubmitTag() : handleCreateTag()
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item className="note_contentTextContainer">
            <ReactQuill
              theme="snow"
              modules={modules}
              format={formats}
              value={contentText}
              className="note_reactQuillContainer"
              onChange={(content, delta, source, editor) => {
                setContentText(editor.getContents());
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="note_notePadFooter">
        <Grid container direction="row" alignItems="center">
          <Grid item className="note_trashButtonContainer">
            <div className="note_trashButton">
              <FiTrash size={20} color={colorscheme.red4} onClick={onDelete} />
            </div>
          </Grid>
          <Grid item className="note_TimeContainer">
            <Grid container direction="column" alignItems="flex-end">
              <Grid item className="note_timeContainer">
                <p className="note_timeText">{noteTime}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="note_saveButtonContainer">
            <div className="note_saveButton">
              <RiSendPlane2Fill
                size={20}
                color={colorscheme.green2}
                onClick={() => {
                  onSave(titleText, contentText, stateTag);
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Note;
