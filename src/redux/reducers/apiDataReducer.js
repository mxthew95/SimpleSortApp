export const GET_API_DATA = "GET_API_DATA";
export const SET_API_DATA = "SET_API_DATA";

export const getApiData = () => ({
  type: GET_API_DATA
});

export const setApiData = (apiData) => ({
  type: SET_API_DATA,
  apiData
});

const initialState = {
  apiData: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_API_DATA:
      return { apiData: action.apiData };
    default:
      return state;
  }
};
