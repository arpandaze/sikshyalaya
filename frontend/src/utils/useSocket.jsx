import { useState, useEffect, useRef } from "react";
import configs from "./configs.jsx";

const useSocket = ({
  endpoint = null,
  onConnect = null,
  fire = true,
  close = false,
  onMessage,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [history, setHistory] = useState([]);
  const [closeState, setCloseState] = useState(close);
  const [endpointState, setEndpointState] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    if (fire && (endpointState || endpoint) != null) {
      ws.current = new WebSocket(
        `${configs.WEBSOCKET_HOST}${endpointState || endpoint}`
      );
      if (!onConnect) {
        ws.current.onopen = () => {
          setIsReady(true);
        };
      } else {
        ws.current.onopen = (data) => {
          setIsReady(true);
          onConnect(data);
        };
      }
    }
  }, [endpointState, endpoint, fire]);

  useEffect(() => {
    if (fire && isReady) {
      ws.current.onmessage = (data) => {
        let ret = onMessage(data);
        if (ret) {
          if (ret.multi) {
            setHistory([...history, ...ret.data]);
          } else {
            setHistory([...history, ret.data]);
          }
        }
      };
    }
  }, [fire, endpointState, onMessage, onConnect, isReady]);

  useEffect(() => {
    if (close && ws.current) {
      ws.current.close();
    }
  }, [closeState, setCloseState]);
  return [ws.current, history, setEndpointState, isReady, setCloseState];
};
export default useSocket;
