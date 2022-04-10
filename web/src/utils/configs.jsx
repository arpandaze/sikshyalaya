const configs = {
  API_HOST: "http://localhost:8080",
  WEBSOCKET_HOST: "ws://localhost:8080",
  PRIVATE_ROUTE_ACCESS: false,
  AUTO_REDIRECT: true,
  PUBLIC_FILES_PATH: "http://localhost:8081",
  USER_TYPES: {
    SUPERADMIN: 1,
    ADMIN: 2,
    TEACHER: 3,
    STUDENT: 4,
  },
};

export default configs;
