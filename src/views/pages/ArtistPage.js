import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArtistPageHeader from "../components/artist/ArtistPageHeader"
import ArtistTrackCard from "../components/track-card/ArtistTrackCard"
import { useSelector } from "react-redux"
import {
    getCurrentArtistsAlbums, getCurrentArtist, getCurrentArtistSaved,
    getRelatedArtists
} from "../../core/Selectors"
import { useFetchAlbumPage, useFetchArtistPage } from "../CustomHooks"


export default function ArtistPage() {
    const currentArtist = useSelector(getCurrentArtist)
    let saved = useSelector(getCurrentArtistSaved)
    let relatedArtists = useSelector(getRelatedArtists)
    const albums = useSelector(getCurrentArtistsAlbums)

    const img = currentArtist !== undefined && currentArtist.get("artistImg") === undefined ? "" : currentArtist.get("artistImg")

    const { fetchArtistPage } = useFetchArtistPage()
    const { fetchTracks } = useFetchAlbumPage()

    if (albums.albums === undefined || albums.singles === undefined || relatedArtists === undefined) {
        return <div className="ArtistPage"></div>
    }

    const toggleFollow = () => {

    }

    return (
        <div className="ArtistPage">
            {currentArtist !== ("" || undefined) &&
                <ArtistPageHeader imgSrc={img} artistName={currentArtist.get("artistName")}
                    toggleFollow={toggleFollow} key={uuidv4()} saved={saved} />}
            <h1>Albums</h1>
            <div className="list">
                {albums.albums.map(each => {
                    return (<ArtistTrackCard key={uuidv4()}
                        onClick={() => fetchTracks(each.get("albumId"))} id={each.get("albumId")}
                        imgSrc={each.get("albumImg")} name={each.get("albumName")} />)
                })}
            </div>
            <h1>Singles and EPs</h1>
            <div className="list">
                {albums.singles.map(each => {
                    return (<ArtistTrackCard key={uuidv4()}
                        onClick={() => fetchTracks(each.get("albumId"))} id={each.get("albumId")}
                        imgSrc={each.get("albumImg")} name={each.get("albumName")} />)
                })}
            </div>
            <h1>Related Artists</h1>
            <div className="list">
                {relatedArtists.map(each => {
                    return (<ArtistTrackCard id={each.get("artistId")} key={uuidv4()}
                        round={true} onClick={() => fetchArtistPage(each.get("artistId"))}
                        imgSrc={each.get("artistImg")} name={each.get("artistName")} />)
                })}
            </div>
        </div>)
}

//Disabled: Related artist
//onClick={() => fetchArtistPage(each.get("artistId"))}