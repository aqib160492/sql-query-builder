import Prism from "prismjs";
import "prismjs/components/prism-sql";
import React, { useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Text, createEditor } from "slate";
import { css } from "@emotion/css";
import { Button } from "@mui/material";

const QueryEditor = ({ query, setQuery }) => {
  console.log(query);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  const initialValue = [
    {
      type: "paragraph",
      children: [
        {
          text: query
        }
      ]
    }
  ];
  // console.log(editor);
  // editor.delete();
  // editor.insertText(query);

  // decorate function depends on the language selected
  const decorate = useCallback(([node, path]) => {
    const ranges = [];
    if (!Text.isText(node)) {
      return ranges;
    }
    const tokens = Prism.tokenize(node.text, Prism.languages["sql"]);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end }
        });
      }

      start = end;
    }

    return ranges;
  }, []);
  return (
    <div>
      <Slate
        editor={editor}
        value={initialValue}
        key={JSON.stringify(initialValue)}>
        <Editable
          style={{ height: "100px", border: "1px solid" }}
          decorate={decorate}
          renderLeaf={renderLeaf}
          placeholder="Write some code..."
          autoFocus
        />
      </Slate>
      <Button
        variant="contained"
        sx={{ mt: 1 }}
        onClick={() => console.log(editor.children[0].children[0].text)}>
        Submit
      </Button>
    </div>
  );
};

const getLength = (token) => {
  if (typeof token === "string") {
    return token.length;
  } else if (typeof token.content === "string") {
    return token.content.length;
  } else {
    return token.content.reduce((l, t) => l + getLength(t), 0);
  }
};

// different token types, styles found on Prismjs website
const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      className={css`
        font-family: monospace;
        background: hsla(0, 0%, 100%, 0.5);

        ${leaf.comment &&
        css`
          color: slategray;
        `}

        ${(leaf.operator || leaf.url) &&
        css`
          color: #9a6e3a;
        `}
        ${leaf.keyword &&
        css`
          color: #07a;
          font-weight: bold;
        `}
        ${(leaf.variable || leaf.regex) &&
        css`
          color: #e90;
        `}
        ${(leaf.number ||
          leaf.boolean ||
          leaf.tag ||
          leaf.constant ||
          leaf.symbol ||
          leaf["attr-name"] ||
          leaf.selector) &&
        css`
          color: #905;
        `}
        ${leaf.punctuation &&
        css`
          color: #999;
        `}
        ${(leaf.string || leaf.char) &&
        css`
          color: #690;
        `}
        ${(leaf.function || leaf["class-name"]) &&
        css`
          color: #dd4a68;
        `}
      `}>
      {children}
    </span>
  );
};

export default QueryEditor;
