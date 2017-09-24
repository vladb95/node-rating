const { Map, fromJS } = require("immutable");
const { expect } = require("chai");

const { makeStore } = require("../src/store");

describe("store", () => {
  it("store configurated", () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: "SET_ENTRIES",
      entries: ["Trainspotting", "28 Days Later"]
    });
    expect(store.getState()).to.equal(
      fromJS({
        entries: ["Trainspotting", "28 Days Later"]
      })
    );
  });
});
