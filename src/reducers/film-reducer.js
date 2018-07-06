
const defaultState = {
    films: [],
    film: {},
    loading: false,
    errors: {}
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case 'FETCH_FILMS_FULFILLED': {
            return {
                ...state,
                films: action.payload.data,
                loading: false,
                errors: {}
            };
        }

        case 'FETCH_FILMS_PENDING': {
            return {
                ...state,
                loading: true,
                errors: {}
            };
        }

        case 'FETCH_FILMS_REJECTED': {
            return {
                ...state,
                loading: false,
                errors: { global: action.payload.message }
            };
        }

        case 'NEW_FILM': {
            return {
                ...state,
                film: {}
            };
        }

        case 'SAVE_FILM_PENDING': {
            return {
                ...state,
                loading: true
            };
        }

        case 'SAVE_FILM_FULFILLED': {
            return {
                ...state,
                films: [...state.films, action.payload.data],
                errors: {},
                loading: false
            };
        }

        case 'SAVE_FILM_REJECTED': {
            const data = action.payload.response.data;
            const { name } = data.errors;
            const errors = { global: data.message,
                name
            };
            return {
                ...state,
                errors: errors,
                loading: false
            };
        }

        case 'FETCH_FILM_PENDING': {
            return {
                ...state,
                loading: true,
                film: {}
            };
        }

        case 'FETCH_FILM_FULFILLED': {
            return {
                ...state,
                film: action.payload.data,
                errors: {},
                loading: false
            };
        }

        case 'UPDATE_FILM_PENDING': {
            return {
                ...state,
                loading: true
            };
        }

        case 'UPDATE_FILM_FULFILLED': {
            const film = action.payload.data;
            return {
                ...state,
                films: state.films.map(item => item.id === film.id ? film : item),
                errors: {},
                loading: false
            };
        }

        case 'UPDATE_FILM_REJECTED': {
            const data = action.payload.response.data;
            const errors = { global: data.message,
                name
            };
            return {
                ...state,
                errors: errors,
                loading: false
            };
        }

        case 'DELETE_FILM_FULFILLED': {
            const id = action.payload.data.id;
            return {
                ...state,
                films: state.films.filter(item => item.id !== id)
            };
        }

        default:
            return state;
    }
}
