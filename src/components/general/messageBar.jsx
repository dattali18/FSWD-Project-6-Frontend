/**
 * This component is used to display messages to the user.
 * it will have a message and a close button.
 * it will have a stack of messages to display.
 * it will have a timeout to close the message after a certain time.
 */

// style
import "./style/messageBar.css";

// icon
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

const categoryIcon = {
  success: faCircleCheck,
  alert: faCircleExclamation,
  warning: faTriangleExclamation,
  info: faCircleInfo,
};

import { useMessages } from "../../utils/MessagesContext.jsx";

export default function MessageBar() {
  // const [messages, setMessages] = useState([
  //   { text: "Please take note of something", category: "success" },
  // ]);

  const { messages, removeMessage } = useMessages();

  const onClick = (message) => {
    removeMessage(message);
  };

  return (
    <div className="messages">
      {messages.map((message, index) => {
        return <Message key={index} message={message} onClose={onClick} />;
      })}
    </div>
  );
}

function Message({ message, onClose }) {
  return (
    <div className={"message message-" + message.category}>
      <div className="btn-icon">
        <FontAwesomeIcon
          icon={categoryIcon[`${message.category}`] || faCircleInfo}
        />
        {message.text}
      </div>
      <button className="" onClick={() => onClose(message)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
