const { createStore } = require("redux");
const { reducer } = require("./reducer");

function makeStore () {
    return createStore(reducer);
}

module.exports = {
    makeStore
};
