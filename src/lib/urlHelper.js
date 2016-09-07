import URL from 'url';

import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';
import _reduce from 'lodash/reduce';
import _union from 'lodash/union';

export function compareUrls(urls) {
  const fields = ['protocol', 'auth', 'hostname', 'port', 'pathname', 'query', 'hash'];
  const processedUrls = urls.map(url => _pick(URL.parse(url, true), fields));

  const diffFields = getDiffFields(...processedUrls, true);
  const queryDiffFields = getDiffFields(...processedUrls.map(url => url.query), true);

  return {
    isSame: _isEqual(...processedUrls),
    diffFields,
    queryDiffFields,
    queryAllFields: _union(Object.keys(processedUrls[0].query || {}), Object.keys(processedUrls[1].query || {}))
  };
}

export function getDiffFields(a, b, twoSides) {
  if (!!twoSides) {
    return _union(getDiffFields(a, b), getDiffFields(b, a));
  }

  return _reduce(a, (result, value, key) => {
    return _isEqual(value, b[key]) ? result : result.concat(key);
  }, []);
}
