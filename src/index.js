import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import createSagaMiddleware from 'redux-saga';

// Components
import App from "./components/App";

// Utilities
import registerServiceWorker from "./registerServiceWorker";

// Reducers
import reducers from './reducers';

// Sagas
import bookingsSaga from './sagas/bookings';

// Styling
import "./index.css";

// Setup saga
const sagaMiddleware = createSagaMiddleware();
const mws = applyMiddleware(sagaMiddleware)

const middlewares = compose(mws, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Setup store
const store = createStore(
  reducers,
  middlewares
);

sagaMiddleware.run(bookingsSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById("root"));
registerServiceWorker();
