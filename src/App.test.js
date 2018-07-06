import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>);
});
