import reducer, { UPDATE, updateUrl } from './urls';

describe('duck/urls', () => {
  describe('#reducer', () => {
    it('should return the initial state', () => {
      const expectedState = ['', ''];
      expect(reducer(undefined, {})).toEqual(expectedState);
    });

    it('should handle UPDATE', () => {
      const currentState = ['http://localhost:3000/', ''];
      const expectedState = ['http://localhost:3000/', 'http://localhost:4080/'];
      expect(reducer(currentState, {
        type: UPDATE,
        payload: {
          index: 1,
          url: 'http://localhost:4080/'
        }
      })).toEqual(expectedState);
    });
  });

  describe('#updateUrl', () => {
    it('should create an action to update url', () => {
      const index = 0;
      const url = 'https://tw.video.yahoo.com/';
      const expectedAction = {
        type: UPDATE,
        payload: {
          index,
          url
        }
      };
      expect(updateUrl(index, url)).toEqual(expectedAction);
    });
  });
});
