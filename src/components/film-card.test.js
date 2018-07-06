import React from 'react';
import FilmCard from './film-card';
import { mount } from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
describe('<FilmCard />', () => {
    const film = {
        'name': 'admin',
        'year': '2018',
        'format': 'DVD',
        'actors': [
            'Arnold Shwarzeneggerr',
            ' Yuri Nikulin',
            ' yo'
        ],
        'id': 'SJnhmb3GQ'
    };
    const onClick = jest.fn();
    const component = mount(<BrowserRouter><FilmCard film={film} deleteFilm={onClick} /></BrowserRouter>);

    it('card should contain name', () => {
        expect(component.find('.header').length).toEqual(1);
        expect(component.find('.header').text()).toEqual(' admin');
    });

    it('calls delete handler', () => {
        const deleteBtn = component.find('.red');
        expect(deleteBtn.length).toEqual(1);
        expect(onClick.mock.calls.length).toBe(0);
        deleteBtn.first().simulate('click');
        expect(onClick.mock.calls.length).toBe(1);
    });
});
