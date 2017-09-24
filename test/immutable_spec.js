const { expect } = require("chai");

describe("immutability", () => {
    describe("a number", () => {
        function increment (currentState) {
            return currentState + 1;
        }

        it("is immutable", () => {
            let state = 30;
            let nextState = increment(state);

            expect(state).to.equal(30);
            expect(nextState).to.equal(31);
        });
    });
});
