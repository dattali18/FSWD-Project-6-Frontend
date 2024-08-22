import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/article.css";
import "../style/editor.css";

import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

import Prism from "prismjs";

import "prismjs/components/prism-java"; // Import the java
import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { postArticle, updateArticle } from "../../api/articles";
// icons
import { FaDownload, FaEnvelope, FaFolderOpen } from "react-icons/fa";

/**
 * instruction for the AI
 * I will make some changes to the code
 * 1. make the Editor not only to be able to create new Article
 * but also to be able to edit an existing article
 * we will do that by adding an optional prop to the Editor component
 * called article which will be an object that contains the article data
 *
 */

import { PropTypes } from "prop-types";

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
      alert("Please fill in all the fields.");
      setIsPosting(false);
      return;
    }

    // check for the tags string to be valid
    if (tags) {
      const tagsArray = tags.split(",").map((tag) => tag.trim());
      if (tagsArray.length > 5) {
        alert("Maximum of 5 tags allowed.");
        setIsPosting(false);
        return;
      }
    }

    try {
      const article = {
        title: title.trim(),
        content: markdown.trim(),
        // TODO - check if there can be error with some tags
        tags: tags.split(",").map((tag) => tag.trim()), // Split tags by comma
      };

      const response = await postArticle(article);

      console.log("Response:", response);

      if (response.status === 201) {
        // Handle success response
        alert("Article posted successfully!");
      } else {
        // Handle server errors
        alert("Failed to post the article.");
      }

      // redirect to the article page
      navigate(`/article/${response.data.article.insertId}`);
    } catch (error) {
      console.error("Error posting article:", error);
      alert("Error posting the article.");
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
        alert("Article updated successfully!");
      } else {
        // Handle server errors
        alert("Failed to update the article.");
      }

      // redirect to the article page
      navigate(`/article/${article.articleId}`);
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Error updating the article.");
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

      <div className="box">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="input-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title"
        />
      </div>

      <div className="box">
        <label htmlFor="tags">Tags (&quot;,&quot; comma separated)</label>
        <input
          type="text"
          id="tags"
          className="input-tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. programming, javascript, web development"
        />
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
          <FaFolderOpen />
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

// adding prop types for the article prop
MyEditor.propTypes = {
  article: PropTypes.object,
};

export default MyEditor;
