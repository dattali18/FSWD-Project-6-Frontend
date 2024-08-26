import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getArticleById } from "../../api/articles";

import MyEditor from "./editor";

export default function UpdateEditor() {
  // this will be the update editor
  // it will fetch the article using the api
  // and pass the prop to the editor component

  const { id } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    // fetch the article
    // using the id
    // set the article
    getArticleById(id).then((data) => {
      setArticle(data.data.article);
    });
  }, [id]);

  return (
    <div>
      {article ? <MyEditor article={article} /> : <div>Loading...</div>}
    </div>
  );
}
