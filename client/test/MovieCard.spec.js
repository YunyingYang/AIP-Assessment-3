import React from 'react';
import { expect } from 'chai';
import TestUtils, { findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import Movie from '../src/components/Homepage/MovieCardLarge';

describe('test:Movie.js', function() {
    it('expect to render a div with movie class', function() {
        const movie = {
            "_id": {
                "$oid": "5ba4bd5e4cf8a6be6525b8d9"
            },
            "movieId": 7441,
            "title": "Thousand Clouds of Peace (2003)",
            "genres": "Drama|Romance",
            "imdbId": 358590,
            "tmdbId": 163676
        };

        // render the movie component into fake DOM
        const component = TestUtils.renderIntoDocument(<Movie movie={movie}/>);
        // find a div with the movie class
        const element = findRenderedDOMComponentWithClass(component, 'movie');
        // pass test if element exists
        expect(element).to.be.ok;
    });

    it('expect to render a div with movie details', () => {
        const movie = {
            "_id": {
                "$oid": "5ba4bd5e4cf8a6be6525b8d9"
            },
            "movieId": 7441,
            "title": "Thousand Clouds of Peace",
            "genres": "Romance",
            "imdbId": 358590,
            "tmdbId": 163676
        };
        const component = TestUtils.renderIntoDocument(<Movie movie={movie}/>);
        const element = findRenderedDOMComponentWithClass(component, 'movie');
        // get text content inside component
        const text = element.textContent;
        // pass test if text equals to 'Genres'
        expect(text).to.equal('Gens');
    });
});
