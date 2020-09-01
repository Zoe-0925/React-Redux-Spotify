import React from 'react';
import renderer from 'react-test-renderer';
import AlbumCard from "../AlbumCard"
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { render, fireEvent, getQueriesForElement } from '@testing-library/react'

//TODO test with this tutorial:
//https://blog.echobind.com/writing-functional-tests-with-react-testing-library-part-1-470870ee1a6

function render(ui) {
    const container = document.createElement("<div>")
    ReactDOM.render(ui, container)
    const queries = getQueriesForElement(container)
    return { container, ...queries }
}

const { Map } = require('immutable');
const mockStore = configureStore([]);

const imgSrc = "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a"
const subtitle = ["artist 1", "artist 2", "artist 3"]
const artistIds = ["1", "2", "3"]

describe('AlbumCard Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore(Map({
            "currentAlbumId": "action.albumId"
        })
        )
    })

    afterEach(cleanup)

    test('render with the default props', async () => {
        const { container, getByText } = await render(AlbumCard, { subtitle: subtitle, artistIds: artistIds, imgSrc: imgSrc, title: "title" })
        expect(getByText(/title/)).toBeInTheDocument()
    })


});