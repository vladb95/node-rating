const { List, Map } = require("immutable");
const { expect } = require("chai");

const { setEntries, next, vote } = require("../src/core");

describe("application logic", () => {
  describe("setEntries", () => {
    it("adding entries to state", () => {
      const state = new Map();
      const entries = ["25", "147 hours"];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(
        Map({
          entries: List.of("25", "147 hours")
        })
      );
    });
  });

  describe("next", () => {
    it("next pair", () => {
      const state = Map({
        entries: List.of("25", "147 hours", "Sunshine")
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("25", "147 hours")
          }),
          entries: List.of("Sunshine")
        })
      );
    });
  });

  describe("vote", () => {
    it("vote for selected item", () => {
      const state = Map({
        vote: Map({
          pair: List.of("25", "147 hours")
        }),
        entries: List()
      });
      const nextState = vote(state, "25");
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("25", "147 hours"),
            tally: Map({
              "25": 1
            })
          }),
          entries: List()
        })
      );
    });

    it("vote for already voted item", () => {
      const state = Map({
        vote: Map({
          pair: List.of("25", "147 hours"),
          tally: Map({
            "25": 1,
            "147 hours": 12
          })
        }),
        entries: List()
      });
      const nextState = vote(state, "25");
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("25", "147 hours"),
            tally: Map({
              "25": 2,
              "147 hours": 12
            })
          }),
          entries: List()
        })
      );
    });

    it("winner to end of the list", () => {
      const state = Map({
        vote: Map({
          pair: List.of("25", "147 hours"),
          tally: Map({
            "25": 4,
            "147 hours": 2
          })
        }),
        entries: List.of("Sunshine", "Millions", "7th mile")
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Sunshine", "Millions")
          }),
          entries: List.of("7th mile", "25")
        })
      );
    });

    it("draw option", () => {
      const state = Map({
        vote: Map({
          pair: List.of("25", "147 hours"),
          tally: Map({
            "25": 2,
            "147 hours": 2
          })
        }),
        entries: List.of("Sunshine", "Millions", "7th mile")
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of("Sunshine", "Millions")
          }),
          entries: List.of("7th mile", "25", "147 hours")
        })
      );
    });

    it("winner", () => {
      const state = Map({
        vote: Map({
          pair: List.of("25", "147 hours"),
          tally: Map({
            "25": 17,
            "147 hours": 2
          })
        }),
        entries: List.of()
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          winner: "25"
        })
      );
    });
  });
});
