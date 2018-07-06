import React, { Component } from 'react';
import {
    NavLink,
    Route
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import FilmListPage from './pages/film-list-page';
import FilmFormPage from './pages/film-form-page';

class App extends Component {
    render() {
        return (
            <Container>
                <div className="ui two item menu">
                    <NavLink className="item" activeClassName="active" exact to="/">Films List</NavLink>
                    <NavLink className="item" activeClassName="active" exact to="/films/new">Add Film</NavLink>
                </div>
                <Route exact path="/" component={FilmListPage}/>
                <Route path="/films/new" component={FilmFormPage}/>
                <Route path="/films/edit/:id" component={FilmFormPage}/>
            </Container>
        );
    }
}

export default App;
