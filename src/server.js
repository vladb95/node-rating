const Server = require("socket.io");

function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(() => {
    io.emit("state", store.getState().toJS());
  });

  io.on("connection", socket => {
    socket.emit("state", store.getState().toJS());
    socket.on("action", store.dispatch.bind(store));
  });
}

module.exports = {
  startServer
};
