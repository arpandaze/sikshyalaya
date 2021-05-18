import React, { useCallback, useMemo, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import colorscheme from "../utils/colors";
import { ImCross } from "react-icons/im";
import { FiTrash } from "react-icons/fi";
import "./statics/css/note.css";

import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";

import { Button, Icon, Toolbar } from "../components/slateComponents";
import { FaTemperatureHigh } from "react-icons/fa";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Note = ({
  title,
  content,
  state,
  onClose,
  onSave,
  onDelete,
  ...rest
}) => {
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState([]);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    setContentText(content);
  }, [content]);

  useEffect(() => {
    setTitleText(title);
  }, [title]);

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
          <Grid item className="note_contentTextContainer">
            <div className="note_contentText">
              <Slate
                editor={editor}
                value={contentText}
                onChange={(value) => setContentText(value)}
              >
                <Toolbar>
                  <MarkButton format="bold" icon="format_bold" />
                  <MarkButton format="italic" icon="format_italic" />
                  <MarkButton format="underline" icon="format_underlined" />
                  <MarkButton format="code" icon="code" />
                  <BlockButton format="heading-one" icon="looks_one" />
                  <BlockButton format="heading-two" icon="looks_two" />
                  <BlockButton format="block-quote" icon="format_quote" />
                  <BlockButton
                    format="numbered-list"
                    icon="format_list_numbered"
                  />
                  <BlockButton
                    format="bulleted-list"
                    icon="format_list_bulleted"
                  />
                </Toolbar>
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  placeholder="Enter some rich text…"
                  spellCheck
                  autoFocus
                  onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event)) {
                        event.preventDefault();
                        const mark = HOTKEYS[hotkey];
                        toggleMark(editor, mark);
                      }
                    }
                  }}
                />
              </Slate>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className="note_trashButtonContainer">
        <div className="note_trashButton">
          <FiTrash size={20} color={colorscheme.red4} onClick={onDelete} />
        </div>
      </Grid>
    </Grid>
  );
};
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default Note;
