import { combineReducers } from 'redux';
import FilmReducer from './film-reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
    filmStore: FilmReducer,
    form: formReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
