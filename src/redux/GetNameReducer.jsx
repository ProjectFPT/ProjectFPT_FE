const stateNameGet = {
  Dataname: [],
  checksubmit: false,
};

export const GetNameReducer = (state = stateNameGet, action) => {
  switch (action.type) {
    case "GETDATANAME": {
      return {
        Dataname: action.dataNameGet,
        checksubmit: action.checksubmit,
      };
    }
    default:
      return state;
  }
};
