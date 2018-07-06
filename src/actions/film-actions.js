import { client } from './';

const url = '/films';

export function fetchFilms() {
    return dispatch => {
        dispatch({
            type: 'FETCH_FILMS',
            payload: client.get(url)
        });
    };
}

export function newFilm() {
    return dispatch => {
        dispatch({
            type: 'NEW_FILM'
        });
    };
}

export function saveFilm(film) {
    return dispatch => {
        return dispatch({
            type: 'SAVE_FILM',
            payload: client.post(url, film)
        });
    };
}

export function fetchFilm(id) {
    return dispatch => {
        return dispatch({
            type: 'FETCH_FILM',
            payload: client.get(`${url}/${id}`)
        });
    };
}

export function updateFilm(film) {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_FILM',
            payload: client.put(`${url}/${film.id}`, film)
        });
    };
}

export function deleteFilm(id) {
    return dispatch => {
        return dispatch({
            type: 'DELETE_FILM',
            payload: client.delete(`${url}/${id}`)
        }).then(() => dispatch(fetchFilms()));
    };
}
