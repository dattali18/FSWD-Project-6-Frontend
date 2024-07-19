import { useParams } from "react-router-dom";

export default function Article() {
    // get the id of the article from the url
    const { id } = useParams();

    // TODO: get the article from the server

    return (
        <div>
            <h1>Article</h1>
            <p>{id}</p>
        </div>
    );
}