import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux"
import SearchBar from "../Components/SearchBar/SearchBar"
import AlbumCard from "../Components/TrackCard/AlbumCard"
import ArtistCard from "../Components/TrackCard/ArtistCard"
import TracklistItem from "../Components/TrackCard/TracklistItem"
import { getTrackToToggle } from "../Reducers/Selectors"
import { useFetchArtistPage } from "../Components/CustomHooks"

export default function Searchpage() {
    const [showResults, setShowResults] = useState(false)
    const [tracks, setTracks] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [trackSaved, setTrackSaved] = useState([])
    const [notFound, setNotFound] = useState(false)
    const tracksToToggle = useSelector(getTrackToToggle)
    const { fetchArtistPage } = useFetchArtistPage()

    useEffect(() => {
        if (tracksToToggle.length !== 0) {
            setTrackSaved(tracksToToggle)
        }
    }, [getTrackToToggle])



    function handleResult(data) {
        setShowResults(false)
        setTracks(data.tracks)
        setArtists(data.artists)
        setAlbums(data.albums)
        setPlaylists(data.playlists)
        setShowResults(true)
    }

    function displayError(err) {
        console.log(err)
    }



    return (
        <div className="Searchpage">
            <div className="SearchResults">
                <SearchBar found={handleResult} onErr={displayError} />
                {notFound && <p className="not-found-message">We could not find any result.</p>}
                {showResults &&
                    <div className="tracks">
                        <p className="title"> Songs</p>
                        <ul className="songList">
                            {tracks.map(each => <TracklistItem initialSaved={trackSaved[tracks.indexOf(each)]}
                                index={tracks.indexOf(each)} key={uuidv4()}
                                previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                                next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                            />)}
                        </ul>
                    </div>}
                {showResults && <div className="artists" >
                    <p className="title"> Artists</p>
                    <div className="contents">
                        {artists.map(each => <ArtistCard onClick={() => fetchArtistPage(each.get("artistId"))}
                            round={false} artist={each} key={uuidv4()} subtitle="Artist" />)}
                    </div>
                </div>}
                {showResults && <div className="albums">
                    <p className="title"> Albums</p>
                    <div className="contents">
                        {albums.map(each =>
                            <AlbumCard title={each.get("albumName")} subtitle={each.get("artistNames")} key={uuidv4()}
                                artistIds={each.get("artistIds")} albumId={each.get("albumId")} imgSrc={each.get("albumImg")}
                            />)}
                    </div>
                </div>}
                }
            </div>
        </div>
    )
}

