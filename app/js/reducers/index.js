import { combineReducers } from 'redux';
import filter from './filter';
import labels from './labels';
import bugs from './bugs';

/* State Structure:
{
  bugs: Map({
    1: {
      id: 1,
      ...
    }
  }),
  labels: Map({
    1: {
      id: 1,
      name: "My label"
    }
  }),
  filter: {
    name: "My bugs",
    value: "assignee:jdoe"
  }
}
*/

const rootReducer = combineReducers({
  filter,
  labels,
  bugs
});

export default rootReducer;
