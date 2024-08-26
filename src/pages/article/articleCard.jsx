import { Link } from "react-router-dom";
import { convertToDateTime } from "../../utils/general/DateUtils";

export default function ArticleCard(article) {
  return (
    <div className="article-card">
      <Link to={"/article/" + article.articleId}>
        <h1>{article.title}</h1>
      </Link>
      <p>{convertToDateTime(article.createdDate)}</p>
      <ul className="categories">
        {article.tags.map((category) => (
          <li className="category" key={category}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
