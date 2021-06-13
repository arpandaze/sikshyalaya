import { useState, useEffect, useContext, useRef } from "react";
import configs from "./configs.jsx";

const useSocket = ({ endpoint, onMessage, onOpen = null, fire = true }) => {
  const [isReady, setIsReady] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    if (fire && endpoint) {
      ws.current = new WebSocket(`${configs.WEBSOCKET_HOST}/${endpoint}`);
      if (!onOpen) {
        ws.current.onopen = () => {
          setIsReady(true);
        };
      } else {
        ws.current.onopen = (data) => {
          onOpen(data);
        };
      }
    }
  }, [endpoint, fire]);

  useEffect(() => {
    if (fire) {
      ws.current.onmessage = (data) => {
        onMessage(data);
      };
    }
    return () => {
      ws.disconnect();
    };
  }, [fire, endpoint, onMessage, onOpen]);
  return [isReady];
};
export default useSocket;
