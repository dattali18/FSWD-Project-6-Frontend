import { useMessages } from "../../utils/MessagesContext.jsx";

export default function Home() {
  const { addMessage } = useMessages();

  return (
    <>
      <h2 className="home-header">Human Story & Ideas</h2>
      <h3 className="home-subheader">
        A place to read, write, and deepen you understanding
      </h3>

      <button
        className="btn btn-blue"
        onClick={() =>
          addMessage({
            text: "Hello World",
            category: "success",
            timeout: 1000,
          })
        }
      >
        click me
      </button>
    </>
  );
}
