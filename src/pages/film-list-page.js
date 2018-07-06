import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilmList from '../components/film-list';
import {
    fetchFilms,
    deleteFilm
} from '../actions/film-actions';

class FilmListPage extends Component {

    componentDidMount() {
        this.props.fetchFilms();
    }

    render() {
        return (
            <div>
                <h1>List of Films</h1>
                <FilmList films={this.props.films}
                          loading={this.props.loading}
                          errors={this.props.errors}
                          deleteFilm={this.props.deleteFilm}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        films: state.filmStore.films,
        loading: state.filmStore.loading,
        errors: state.filmStore.errors
    };
}

export default connect(mapStateToProps, {
    fetchFilms,
    deleteFilm
})(FilmListPage);
