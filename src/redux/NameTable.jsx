const initialState = {
  formValues: {},
  message: "",
  checksubmitForm: false,
  score: [],
};

const NameTable = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FORMVALUES":
      return {
        ...state,
        formValues: action.payload,
        checksubmitForm: action.checksubmit
      };
    case "SUBMIT_FORM":
      return {
        ...state,
        score: action.score,
        message: "Form submitted!!",
        checksubmitForm: action.checksubmit,
      };
    default:
      return state;
  }
};

export default NameTable;
