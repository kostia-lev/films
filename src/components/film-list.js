import React, { Component } from 'react';
import {
    Card,
    Message,
    Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FilmCard from './film-card';

export default class FilmList extends Component {

    constructor() {
        super();
        this.loadingMessage = (
            <Message icon info>
                <Icon name='circle notched' loading/>
                <Message.Content>
                    <Message.Header>Just one second</Message.Header>
                    We are fetching that content for you.
                </Message.Content>
            </Message>
        );

        this.emptyMessage = (
            <Message icon info>
                <Icon name='warning circle'/>
                <Message.Content>
                    <Message.Header>No Films Found</Message.Header>
                    <p>Add some new films to get started.</p>
                    <Link to={'/films/new'} className="ui button primary">Add New Film</Link>
                </Message.Content>
            </Message>
        );

        this.timeoutMessage = (global) => (
            <Message icon negative>
                <Icon name='wait'/>
                <Message.Content>
                    <Message.Header>{global}</Message.Header>
                    Is the backend server running?
                </Message.Content>
            </Message>
        );
    }

    state = {
        filter: {
            name: '',
            actor: ''
        }
    };

    onKeyUp = (stateField) => (event) => {
        const input = this.refs[stateField + 'Input'];
        const newFilter = {
            filter: {
                ...this.state.filter,
                [stateField]: input.value
            }
        };
        this.setState({ ...this.state, ...newFilter });
    };

    filterCallBack = (film) => {
        const { filter: { name, actor } } = this.state;

        if (!name.length && !actor.length) {
            return true;
        }

        let nameThere = false;
        let actorThere = false;

        if (name.length) {
            nameThere = film.name.toLowerCase()
                            .includes(name.toLowerCase());
        }
        if (actor.length) {
            for (let i = 0; i < film.actors.length; i++) {
                if (film.actors[i].toLowerCase()
                                  .includes(actor.toLowerCase())) {
                    actorThere = true;
                    break;
                }
            }
        }
        return (nameThere || !name.length) && (actorThere || !actor.length);
    };

    render() {
        const { films, loading, errors } = this.props;
        return (
            <div>
                {loading && this.loadingMessage}
                {films.length === 0 && !loading && !errors.global && this.emptyMessage}
                {errors.global && this.timeoutMessage(errors.global)}
                {films.length > 0 && (
                    <div className="ui segments">
                        <div className="ui segment">
                            <p>Filters:</p>
                        </div>
                        <div className="ui horizontal segments">
                            <div className="ui segment">
                                <div className="ui fluid input">
                                    <input
                                        ref='nameInput'
                                        onKeyUp={this.onKeyUp('name')}
                                        placeholder="Search films by author name or by film name"
                                        type="text"/>
                                </div>
                            </div>
                            <div className="ui segment">
                                <div className="ui fluid input">
                                    <input
                                        ref='actorInput'
                                        onKeyUp={this.onKeyUp('actor')}
                                        placeholder="Search films by actor name or by actor name"
                                        type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {films.length > 0 &&
                <Card.Group>
                    {films.filter(this.filterCallBack)
                          .map(film => {
                              return (
                                  <FilmCard key={film.id} film={film} deleteFilm={this.props.deleteFilm}/>
                              );
                          })}
                </Card.Group>
                }
            </div>
        );
    }
}
