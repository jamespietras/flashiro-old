import _cloneDeep from 'lodash/cloneDeep';
import _extend from 'lodash/extend';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _remove from 'lodash/remove';

export function arrayWithout(array, predicate) {
  const newArray = _cloneDeep(array);

  _remove(newArray, predicate);

  return newArray;
}

export function arrayUpdate(array, predicate, action) {
  const newArray = _cloneDeep(array);
  const selectedItem = _find(newArray, predicate);

  if (typeof action === 'function') {
    const selectedItemIndex = _findIndex(newArray, predicate);
    newArray[selectedItemIndex] = action(selectedItem);
  } else {
    _extend(selectedItem, action);
  }

  return newArray;
}
