import React from 'react';
import { Provider } from 'react-redux';

import initStore from '../store';
import demoReducer from '../reducers/demoReducer';
import DemoConnector from '../components/connectors/DemoConnector';

export default class extends React.Component {
  // eslint-disable-next-line no-unused-vars
  static async getInitialProps({ pathname, query, req, res, jsonPageRes, err }) {
    const isServer = !!req;
    const headers = (req && req.headers) || {};

    const isResultNull = true;
    const apiData = {};
    const errorApiResponse = "";
    const store = initStore(demoReducer, { isResultNull, apiData, errorApiResponse }, isServer);
    if (!isServer) {
      store.dispatch({ type: 'API_DATA', result: apiData });
      store.dispatch({ type: 'RESULT_STATUS', result: isResultNull });
      store.dispatch({ type: 'ERROR_API_REPONSE', errorReponse: errorApiResponse });
    }
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    const initialState = props.initialState;
    initialState.url = props.url;
    this.store = initStore(demoReducer, initialState, props.isServer);
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={this.store}>
        <DemoConnector />
      </Provider>
    );
  }
}
