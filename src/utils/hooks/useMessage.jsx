import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export function useMessage() {
  return useContext(MessageContext);
}
