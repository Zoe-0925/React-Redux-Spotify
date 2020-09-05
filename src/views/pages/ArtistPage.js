import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArtistPageHeader from "../components/artist/ArtistPageHeader"
import ArtistTrackCard from "../components/track-card/ArtistTrackCard"
import { useSelector } from "react-redux"
import {
    getCurrentArtistsAlbums, getCurrentArtist, getCurrentArtistSaved,
    getRelatedArtists
} from "../../core/Selectors"
import { useDispatchArtistPage } from "./CustomHooks"


export default function ArtistPage() {
    const currentArtist = useSelector(getCurrentArtist)
    let saved = useSelector(getCurrentArtistSaved)
    let relatedArtists = useSelector(getRelatedArtists)
    const albums = useSelector(getCurrentArtistsAlbums)

    const img = currentArtist !== undefined && currentArtist.get("artistImg") === undefined ? "" : currentArtist.get("artistImg")

    const { fetchTracks, fetchArtistPage } = useDispatchArtistPage()


  

    if (albums.albums === undefined || albums.singles === undefined || relatedArtists === undefined) {
        return <div className="ArtistPage"></div>
    }





    return (
        <div className="ArtistPage">
            {currentArtist !== ("" || undefined) &&
                <ArtistPageHeader imgSrc={img} artistName={currentArtist.get("artistName")}
                    key={uuidv4()} saved={saved} />}
            <h1>Albums</h1>
            <div className="list">
                {albums.albums.map(each => {
                    return (<ArtistTrackCard onClick={fetchTracks}  id={each.get("albumId")}
                        imgSrc={each.get("albumImg")} name={each.get("albumName")} />)
                })}
            </div>
            <h1>Singles and EPs</h1>
            <div className="list">
                {albums.singles.map(each => {
                    return (<ArtistTrackCard onClick={fetchTracks} id={each.get("albumId")}
                        imgSrc={each.get("albumImg")} name={each.get("albumName")} />)
                })}
            </div>
            <h1>Related Artists</h1>
            <div className="list">
                {relatedArtists.map(each => {
                    return (<ArtistTrackCard id={each.get("artistId")}
                        round={true} onClick={() => fetchArtistPage}
                        imgSrc={each.get("artistImg")} name={each.get("artistName")} />)
                })}
            </div>
        </div>)
}