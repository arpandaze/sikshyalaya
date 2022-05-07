const getConfig = () => {
  switch (process.env.REACT_APP_TARGET_BUILD_ENV) {
    case "prod":
    return {
        API_HOST: "http://sikshyalaya.centralindia.cloudapp.azure.com:8080",
        WEBSOCKET_HOST: "ws://sikshyalaya.centralindia.cloudapp.azure.com:8080",
        PRIVATE_ROUTE_ACCESS: false,
        AUTO_REDIRECT: true,
        PUBLIC_FILES_PATH: "http://sikshyalaya.centralindia.cloudapp.azure.com:8081",
        USER_TYPES: {
          SUPERADMIN: 1,
          ADMIN: 2,
          TEACHER: 3,
          STUDENT: 4,
        },
      };

    case "nondock":
      return {
        API_HOST: "http://localhost:8181",
        WEBSOCKET_HOST: "ws://localhost:8181",
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

    default:
      return {
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
  }
};

const configs = getConfig();
export default configs;
