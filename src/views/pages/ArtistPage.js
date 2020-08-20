import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArtistPageHeader from "../components/artist/ArtistPageHeader"
import ArtistTrackCard from "../components/track-card/ArtistTrackCard"
import { useSelector } from "react-redux"
import {
    getCurrentArtistsAlbums, getCurrentArtist, getToken, getCurrentArtistSaved,
    getRelatedArtists
} from "../../core/Selectors"
import history from "../../core/history"
import { useDispatchArtistPage } from "./CustomHooks"


export default function ArtistPage() {
    const currentArtist = useSelector(getCurrentArtist)
    let saved = useSelector(getCurrentArtistSaved)
    let relatedArtists = useSelector(getRelatedArtists)
    const albums = useSelector(getCurrentArtistsAlbums)
    const token = useSelector(getToken)

    const img = currentArtist!==undefined && currentArtist.get("artistImg")===undefined? "":currentArtist.get("artistImg")

    const { fetchTracks, fetchArtistPage } = useDispatchArtistPage()


    useEffect(() => {
        if (token === "") {
            history.push("/")
        }
    }, [])

    let albumRows = ""
    let singleRows = ""
    let relatedRows = ""
    if (albums.albums !== undefined && albums.singles !== undefined && relatedArtists !== undefined) {
        albumRows = albums.albums.map(each =>
            <ArtistTrackCard onClick={() => { fetchTracks }}
                id={each.get("albumId")}
                imgSrc={each.get("albumImg")} name={each.get("albumName")} />)
        singleRows = albums.singles.map(each =>
            <ArtistTrackCard onClick={() => { fetchTracks }}
                id={each.get("albumId")}
                imgSrc={each.get("albumImg")} name={each.get("albumName")} />)
        relatedRows = relatedArtists.map(each =>
            <ArtistTrackCard id={each.get("artistId")}
                round={true} onClick={() => fetchArtistPage}
                imgSrc={each.get("artistImg")} name={each.get("artistName")} />)
    }

    return (
        <div className="ArtistPage">
            {currentArtist !== ("" || undefined) &&
                <ArtistPageHeader imgSrc={img} artistName={currentArtist.get("artistName")}
                    key={uuidv4()} saved={saved} />}
            <h1>Albums</h1>
            <div className="list">
                {albumRows}
            </div>
            <h1>Singles and EPs</h1>
            <div className="list">
                {singleRows}
            </div>
            <h1>Related Artists</h1>
            <div className="list">
                {relatedRows}
            </div>
        </div>)
}