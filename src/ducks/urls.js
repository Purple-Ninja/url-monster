// Actions
export const UPDATE = 'url-monster/urls/UPDATE';

// Reducer
export default function reducer(state = ['', ''], action = {}) {
  switch(action.type) {
    case UPDATE:
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
    type: UPDATE,
    payload: {
      index,
      url
    }
  }
}
