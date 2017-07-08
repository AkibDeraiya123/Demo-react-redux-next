const initialState = {
  isResultNull: true,
  errorApiResponse: "",
  apiData: {}
};

const demoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'API_DATA':
      return Object.assign({}, state, { apiData: action.result });
    case 'ERROR_API_REPONSE':
      return Object.assign({}, state, { errorApiResponse: action.errorReponse });
    case 'RESULT_STATUS':
      return Object.assign({}, state, { isResultNull: action.resultStatus });
    default:
      return state;
  }
};

export default demoReducer;
