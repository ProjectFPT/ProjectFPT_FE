const stateInfoTable = {
  columns: [],
  table: [],
  addCSV: false,
  name: []
};

export const InfoTable = (state = stateInfoTable, action) => {
  switch (action.type) {
    case "POSTDATA":
      return {
        columns: action.dataColums,
        table: action.dataString,
        addCSV: action.checkAddCSV,
      };
    case "POSTDATANAME":
      return {};
    default:
      return state;
  }
}
