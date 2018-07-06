import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Button,
    Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function FilmCard({ film, deleteFilm }) {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    <Icon name='film'/> {film.name}
                </Card.Header>
                <Card.Description>
                    <p><Icon name='clock'/> {film.year}</p>
                    <p><Icon name='certificate'/> {film.format}</p>
                    <p><Icon name='users'/> {film.actors.length && film.actors.join(',')}</p>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className="ui two buttons">
                    <Link to={`/films/edit/${film.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => deleteFilm(film.id)}>Delete</Button>
                </div>
            </Card.Content>
        </Card>
    );
}

FilmCard.propTypes = {
    film: PropTypes.object.isRequired
};
