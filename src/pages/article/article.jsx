import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useState } from "react";

import axios from "axios";
import { BASE_URL } from "../../data/api";

export default function Article() {
  // get the id of the article from the url
  const { id } = useParams();

  // the page is an HTML file
  const [page, setPage] = useState("");


  useEffect(() => {
    const url = `${BASE_URL}/api/articles/${id}`;
    const fetchArticle = async () => {
      try {
        const response = await axios.get(url);
        setPage(response.data);
      } catch (error) {
        console.error("Error fetching article", error);
      }
    };
    fetchArticle();
  }, [id]);

  return (
    <div>
      <h1>Article</h1>
      <div dangerouslySetInnerHTML={{__html: page}}></div>
    </div>
  );
}
