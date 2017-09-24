const { List, Map } = require("immutable");

const INITIAL_STATE = Map();

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get("pair");
  const aVotes = vote.getIn(["tally", a], 0);
  const bVotes = vote.getIn(["tally", b], 0);
  if (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else return [a, b];
}

function setEntries(state, entries) {
  return state.set("entries", List(entries));
}

function next(state) {
  const entries = state.get("entries")
                    .concat(getWinners(state.get("vote")));
  if (entries.size === 1)
    return state.remove("vote")
            .remove("entries")
            .set("winner", entries.first());
  return state.merge({
    vote: Map({
      pair: entries.take(2)
    }),
    entries: entries.skip(2)
  });
}

function vote(state, item) {
  return state.updateIn(["vote", "tally", item], 0, tally => tally + 1);
}

module.exports = {
  setEntries,
  next,
  vote,
  INITIAL_STATE
};
