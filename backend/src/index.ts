import Server from "./server/server";
import router from "./router/router";
import MySQL from "./mysql/mysql";
import cors = require('cors')
const server = Server.init(3030);

server.app.use(cors())
server.app.use(router);
// MySQL instance
MySQL.instance;

server.start(() => {
  console.log("running on port 3030");
});
