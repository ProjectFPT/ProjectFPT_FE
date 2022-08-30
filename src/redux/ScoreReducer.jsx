const stateScore = {
  score: {},
  checkRender: false,
};

export const ScoreReducer = (state = stateScore, action) => {
  if (action.type === "POSTDATASCORE") {
    return {
      score: action.dataScore,
      checkRender: action.checkRender,
    };
  } else return state;
};
