const { next, setEntries, vote, INITIAL_STATE } = require("./core");

function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_ENTRIES": return setEntries(state, action.entries);
        case "VOTE": return vote(state, action.entry);
        case "NEXT": return next(state);
    }
    return state;
}

module.exports = {
    reducer
};
