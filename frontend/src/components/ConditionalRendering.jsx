const ConditionalRendering = ({ condition = true, children }) => {
  if (condition) {
    return children;
  } else {
    return null;
  }
};
export default ConditionalRendering;
