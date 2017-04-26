import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';

const configureStore = props => (
  createStore(
    rootReducer,
    props,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
);

export default configureStore;
