import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

import Prism from "prismjs";

import { FaDownload, FaEnvelope, FaMarkdown } from "react-icons/fa";

import "prismjs/components/prism-java"; // Import the java
import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { postArticle, updateArticle } from "../../api/articles";

import { useMessage } from "../../utils/hooks/useMessage";

import "../style/article.css";
import "../style/editor.css";
import "../style/index.css";

function MyEditor({ article }) {
  let title_, markdown_, tags_;
  let isUpdate = false;
  // if article is not null, then we are editing an existing article
  if (article) {
    title_ = article.title;
    markdown_ = article.content;
    tags_ = article.tags.join(", ");

    isUpdate = true;
  } else {
    title_ = "";
    markdown_ = "# Hello World";
    tags_ = "";
  }

  const [title, setTitle] = useState(title_);
  const [markdown, setMarkdown] = useState(markdown_);
  const [tags, setTags] = useState(tags_);
  const [isPosting, setIsPosting] = useState(false);

  const { addMessage } = useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    Prism.highlightAll();
  }, [markdown]);

  const handleEditorChange = (e) => {
    const text = e.target.value;
    setMarkdown(text);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handlePost = async () => {
    setIsPosting(true);

    // check if the given properties are valid, tags is optional
    if (!title.trim() || !markdown.trim()) {
      addMessage({
        text: "Please fill in all the fields.",
        type: "warning",
        timeout: 3000,
      });
      setIsPosting(false);
      return;
    }

    // check for the tags string to be valid
    if (tags) {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      if (tagsArray.length > 5) {
        addMessage({
          text: "Maximum of 5 tags allowed.",
          type: "warning",
          timeout: 3000,
        });
        setIsPosting(false);
        return;
      }
    }

    try {
      const article = {
        title: title.trim(),
        content: markdown.trim(),
        tags: tags.split(",").map((tag) => tag.trim()), // Split tags by comma
      };

      const response = await postArticle(article);

      if (response.status === 201) {
        // Handle success response
        addMessage({
          text: "Article posted successfully!",
          type: "success",
          timeout: 3000,
        });
      } else {
        // Handle server errors
        addMessage({
          text: "Failed to post the article.",
          type: "alert",
          timeout: 3000,
        });
      }

      // redirect to the article page
      navigate(`/article/${response.data.article.insertId}`);
    } catch (error) {
      console.error("Error posting article:", error);
      addMessage({
        text: "Error posting the article.",
        type: "alert",
        timeout: 3000,
      });
    } finally {
      setIsPosting(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const articleObject = {
        id: article.articleId,
        title: title.trim(),
        content: markdown.trim(),
        tags: tags.split(",").map((tag) => tag.trim()),
      };

      const response = await updateArticle(articleObject);

      if (response.status === 200) {
        // Handle success response
        addMessage({
          text: "Article updated successfully!",
          type: "success",
          timeout: 3000,
        });
      } else {
        // Handle server errors
        addMessage({
          text: "Failed to update the article.",
          type: "alert",
          timeout: 3000,
        });
      }

      // redirect to the article page
      navigate(`/article/${article.articleId}`);
    } catch (error) {
      console.error("Error updating article:", error);
      addMessage({
        text: "Error updating the article.",
        type: "alert",
        timeout: 3000,
      });
    } finally {
      setIsPosting(false);
    }
  };

  // adding synchronized scrolling between the two divs
  const syncScroll = (e) => {
    const { target } = e;
    const { scrollTop, scrollLeft } = target;
    const other =
      target.id === "editor-input" ? "editor-output" : "editor-input";
    const otherElement = document.getElementById(other);
    otherElement.scrollTop = scrollTop;
    otherElement.scrollLeft = scrollLeft;
  };

  // sync the #editor-input and #editor-output scroll
  // call this block of code at the end of the render
  useEffect(() => {
    const editorInput = document.getElementById("editor-input");
    const editorOutput = document.getElementById("editor-output");

    editorInput.addEventListener("scroll", syncScroll);
    editorOutput.addEventListener("scroll", syncScroll);

    return () => {
      editorInput.removeEventListener("scroll", syncScroll);
      editorOutput.removeEventListener("scroll", syncScroll);
    };
  });

  return (
    <>
      <h1 className="title">Markdown Editor</h1>
      <div className="from">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
          />
        </div>

        <div className="input-group">
          <label htmlFor="tags">Tags (&quot;,&quot; comma separated)</label>
          <input
            type="text"
            id="tags"
            className="form-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. programming, javascript, web development"
          />
        </div>
      </div>

      <div className="editor">
        <div className="group">
          <textarea
            id="editor-input"
            value={markdown}
            onChange={handleEditorChange}
            className="editor-textarea"
          />
          <div className="html article" id="editor-output">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn-blue btn-icon" onClick={handleDownload}>
            <FaDownload />
            Download
          </button>
          <button
            className="btn btn-green btn-icon"
            onClick={isUpdate ? handleUpdate : handlePost}
            disabled={isPosting}
          >
            <FaEnvelope />
            {isUpdate ? "Update" : "Post"}
          </button>
        </div>
      </div>

      <div className="box">
        <label
          htmlFor="inputFile"
          className="btn-gray btn btn-icon file-upload"
        >
          Custom Upload
          <div className="file-icon">
            <FaMarkdown />
          </div>
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

// adding prop types for the article prop
MyEditor.propTypes = {
  article: PropTypes.object,
};

export default MyEditor;
