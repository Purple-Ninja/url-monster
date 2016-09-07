import reducer, { UPDATE, updateFilter } from './filter';

describe('ducks/filter', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      const expectedState = 'diff';
      expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it('should handle UPDATE', () => {
      const currentState = 'diff';
      const expectedState = 'all';
      expect(reducer(currentState, {
        type: UPDATE,
        payload: {
          filter: 'all'
        }
      })).toEqual(expectedState);
    });
  });

  describe('#updateFilter', () => {
    it('should create an action to update filter', () => {
      const filter = 'diff';
      const expectedAction = {
        type: UPDATE,
        payload: {
          filter
        }
      };
      expect(updateFilter(filter)).toEqual(expectedAction);
    });
  });
});
