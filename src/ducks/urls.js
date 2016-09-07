// Actions
const UPDATE_URL = 'url-monster/urls/UPDATE_URL';

// Reducer
export default function reducer(state = ['', ''], action = {}) {
  switch(action.type) {
    case UPDATE_URL:
      const { index, url } = action.payload;
      return [
        ...state.slice(0, index),
        url,
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}

// Action Creators
export function updateUrl(index, url) {
  return {
    type: UPDATE_URL,
    payload: {
      index,
      url
    }
  }
}
