const { Map, fromJS } = require("immutable");
const { expect } = require("chai");

const { reducer } = require("../src/reducer");

describe("reducer", () => {
    it("handles SET_ENTRIES", () => {
        const initialState = Map();
        const action = { type: "SET_ENTRIES", entries: ["25"] };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ["25"]
        }));
    });

    it("handles NEXT", () => {
        const initialState = fromJS({
            entries: ["25", "147 hours"]
        });
        const action = { type: "NEXT" };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["25", "147 hours"]
            },
            entries: []
        }));
    });

    it("handles VOTE", () => {
        const initialState = fromJS({
            vote: {
                pair: ["25", "147 hours"]
            },
            entries: []
        });
        const action = { type: "VOTE", entry: "25" };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["25", "147 hours"],
                tally: {
                    "25": 1
                }
            },
            entries: []
        }));
    });

    it("handles empty state", () => {
        const action = { type: "SET_ENTRIES", entries: ["25"] };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ["25"]
        }));
    });
});