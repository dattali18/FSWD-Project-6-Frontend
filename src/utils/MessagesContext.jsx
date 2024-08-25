import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    if (message.timeout) {
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg !== message)
        );
      }, message.timeout);
    }
  };

  const removeMessage = (message) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg !== message));
  }

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

MessagesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
