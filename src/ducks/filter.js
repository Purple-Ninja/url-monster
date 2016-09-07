// Actions
export const UPDATE = 'url-monster/filter/UPDATE';

// Reducer
export default function reducer(state = 'diff', action = {}) {
  switch(action.type) {
    case UPDATE:
      return action.payload.filter;
    default:
      return state;
  }
}

// Action Creators
export function updateFilter(filter) {
  return {
    type: UPDATE,
    payload: {
      filter
    }
  }
}
