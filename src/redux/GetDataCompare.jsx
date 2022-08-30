const stateDataCompare = {
    name: [],
    score: [],
  };
  
  export function GetDataCompare(state = stateDataCompare, action) {
    switch (action.type) {
        case "GETDATACOMPARE": {
            return {
                name: action.name,
                score: action.score,
            };
        }
        default:
            return state;
    }
}