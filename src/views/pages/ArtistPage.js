import React, { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArtistPageHeader from "../components/artist/ArtistPageHeader"
import { fetchArtistsAlbumsLoading } from "../../core/artist/Actions"
import ArtistTrackCard from "../components/track-card/ArtistTrackCard"
import { useDispatch, useSelector } from "react-redux"
import {
    getCurrentArtistsAlbums, getCurrentArtist, getToken, getCurrentArtistSaved,
    getRelatedArtists
} from "../../core/Selectors"
import ArtistCard from "../components/track-card/ArtistCard"
import history from "../../core/history"

export default function ArtistPage() {
    //const [currentArtist, setCurrentArtist] = useState("")
    // const [relatedArtists, setRelatedArtists] = useState([])

    const dispatch = useDispatch()
    const currentArtist = useSelector(getCurrentArtist)
    let saved = useSelector(getCurrentArtistSaved)
    let relatedArtists = useSelector(getRelatedArtists)
    const albums = useSelector(getCurrentArtistsAlbums)
    const token = useSelector(getToken)

    useEffect(() => {
        if (token === "") {
            history.push("/")
        }
    }, [])

    const fetchArtistPage = useCallback(
        (e) => {
            dispatch(fetchArtistsAlbumsLoading(e.target.id))
            history.push("/albums")
        },
        [dispatch],
    )

    let albumRows = ""
    let singleRows = ""
    let relatedRows = ""
    if (albums.albums !== undefined && albums.singles !== undefined && relatedArtists !== undefined) {
        albumRows = albums.albums.map(each =>
            <ArtistTrackCard imgSrc={each.get("albumImg")} albumId={each.get("albumId")} albumName={each.get("albumName")} />)
        singleRows = albums.singles.map(each =>
            <ArtistTrackCard imgSrc={each.get("albumImg")} albumId={each.get("albumId")} albumName={each.get("albumName")} />)
        relatedRows = relatedArtists.map(each =>
            <ArtistCard imgSrc={each.get("artistImg")} title={each.get("artistName")} subtitle="Artist" artistId={each.get("artistId")}
                onClick={fetchArtistPage} id={each.get("artistId")} />)
    }

    return (
        <div className="ArtistPage">
            {currentArtist !== ("" || undefined) &&
                <ArtistPageHeader imgSrc={currentArtist.get("artistImg")} artistName={currentArtist.get("artistName")}
                    key={uuidv4()} saved={saved} />}
            <h1>Albums</h1>
            <div className="contents">
                {albumRows}
            </div>
            <h1>Singles and EPs</h1>
            <div className="contents">
                {singleRows}
            </div>
            <h1>Related Artists</h1>
            <div className="contents">
                {relatedRows}
            </div>
        </div>)
}