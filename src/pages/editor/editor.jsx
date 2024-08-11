import { useEffect, useState } from "react";

import "../style/article.css";
import "../style/editor.css";

import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

import Prism from "prismjs";

import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language
import "prismjs/components/prism-java"// Import the java

function MyEditor() {
  const [markdown, setMarkdown] = useState("# Hello World");

  useEffect(() => {
    Prism.highlightAll();
  }, [markdown]);

  const handleEditorChange = (e) => {
    const text = e.target.value;
    setMarkdown(text);
  };

  const onClick = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  // adding a drop box to upload a .md file

  return (
    <>
      <h1 className="title">Markdown Editor</h1>
      <div className="editor">
        <div className="group">
          <textarea
            value={markdown}
            onChange={handleEditorChange}
            className="editor-textarea"
          />
          <div className="html article">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
        <button className="btn btn-blue" onClick={onClick}>
          Download
        </button>
      </div>
      <div className="box">
        <label htmlFor="inputFile" className="file-upload">
          Custom Upload
        </label>
        <input
          type="file"
          accept=".md"
          id="inputFile"
          className="inputFile"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              setMarkdown(e.target.result);
            };
            reader.readAsText(file);
          }}
        />
      </div>
    </>
  );
}

export default MyEditor;
