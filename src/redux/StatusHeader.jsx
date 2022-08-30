const stateHeader = {
  activeAdd: true,
  activeCompare: false,
};

export const StatusHeader = (state = stateHeader, action) => {
  switch (action.type) {
    case "POSTSTATUS":
      return {
        // ...state,
        activeAdd: action.activeAdd,
        activeCompare: action.activeCompare,
      };
    default:
      return state;
  }
};
