import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import {
    newFilm,
    saveFilm,
    fetchFilm,
    updateFilm
} from '../actions/film-actions';
import FilmForm from '../components/film-form';

class FilmFormPage extends Component {

    state = {
        redirect: false
    };

    componentDidMount = () => {
        const { id } = this.props.match.params;
        if (id) {
            this.props.fetchFilm(id);
        } else {
            this.props.newFilm();
        }
    };

    submit = (film) => {
        const filmFormatted = {...film};
        filmFormatted.actors = filmFormatted.actors.length && filmFormatted.actors.split(',');
        if (!filmFormatted.id) {
            return this.props.saveFilm(filmFormatted)
                       .then(response => this.setState({ redirect: true }))
                       .catch(err => {
                           throw new SubmissionError(this.props.errors);
                       });
        } else {
            return this.props.updateFilm(filmFormatted)
                       .then(response => this.setState({ redirect: true }))
                       .catch(err => {
                           throw new SubmissionError(this.props.errors);
                       });
        }
    };

    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                        <Redirect to="/"/> :
                        <FilmForm film={this.props.film} loading={this.props.loading} onSubmit={this.submit}/>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        film: state.filmStore.film,
        errors: state.filmStore.errors
    };
}

export default connect(mapStateToProps, {
    newFilm,
    saveFilm,
    fetchFilm,
    updateFilm
})(FilmFormPage);
