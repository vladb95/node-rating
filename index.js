const { makeStore } = require("./src/store");
const { startServer } = require("./src/server");

const store = makeStore();

startServer(store);

store.dispatch({
  type: "SET_ENTRIES",
  entries: require("./entries.json")
});
store.dispatch({ type: "NEXT" });

module.exports = {
  store
};
