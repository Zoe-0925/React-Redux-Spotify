import React, { useState } from "react";
import {useSelector} from "react-redux"
import { createArtistFromList, createTracksForAlbum, createPlaylist,createAlbumFromData } from "../Utils/Utils"
import { throttle } from "lodash"
import { fetchSearchResults } from "../Api/ApiCalls"
import { getToken } from "../../Reducers/Selectors";

export default function SearchBar(props) {
    const [query, setQuery] = useState("")
    const handleInputDebounce = throttle(handleChange, 1000)
    const token = useSelector(getToken)

    async function handleChange(e) {
        let newQuery = encodeURI(e.target.value)
        setQuery(encodeURI(e.target.value))
        const data = await fetchSearchResults(token, newQuery)
        if(data!== undefined && data.tracks!== undefined && data.artists!== undefined
            && data.playlists!== undefined && data.albums!== undefined){
            let artists = createArtistFromList(data.artists.items)
            let tracks = createTracksForAlbum(data.tracks.items)
            let albums = data.albums.items.map(each => createAlbumFromData(each))
            let playlists = createPlaylist(data.playlists.items)
            props.found({
                artists: artists,
                albums: albums,
                tracks: tracks,
                playlists: playlists
            })
        }
    }

    return (
        <div className="SearchBar">
            <input className="search-input" type="text" onChange={handleInputDebounce}
                placeholder="Search for artists or songs" />
        </div>
    )
}