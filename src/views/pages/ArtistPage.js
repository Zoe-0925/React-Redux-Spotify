import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { formatRowDisplay } from "../../core/utils/Utils"
import ArtistPageHeader from "../components/artist/ArtistPageHeader"
import { fetchArtistsAlbumsLoading } from "../../core/artist/Actions"
import ArtistTrackCard from "../components/track-card/ArtistTrackCard"
import { useDispatch, useSelector } from "react-redux"
import { findArtistById, getRelatedArtists, getCurrentArtistId, getArtistSaved } from "../../core/artist/Selectors"
import { getCurrentArtistsAlbums } from "../../core/album/Selectors"
import SideMenu from "../components/side-menu/SideMenu"
import ArtistCard from "../components/track-card/ArtistCard"
import { store } from "../../index"

export default function ArtistPage(props) {
    const [albums, setAlbums] = useState([])
    //const [currentArtist, setCurrentArtist] = useState("")
    // const [relatedArtists, setRelatedArtists] = useState([])

    const storeState = store.getState()
    const dispatch = useDispatch()
    const artistReducer = useSelector(state => state.ArtistReducer)
    const currentArtistId = artistReducer.get("currentArtistId")
    const currentArtist = artistReducer.get("artists").find(item => item.get("artistId") === currentArtistId)
    let saved = currentArtist.get("saved")
    let relatedArtists = currentArtist.get("relatedArtists")

    console.log("relatedArtists", relatedArtists)
    console.log("saved", saved)
    console.log("currentArtist", currentArtist)

    useEffect(() => {
        const albumFromStore = getCurrentArtistsAlbums(storeState)
        if (albumFromStore !== undefined) {
            setAlbums(albumFromStore)
        }
    }, [storeState.AlbumReducer])


    const fetchArtistPage = useCallback(
        (e) => {
            dispatch(fetchArtistsAlbumsLoading(e.target.id))
            props.goToAlbumpage()
        },
        [dispatch],
    )

    let albumRows = ""
    let singleRows = ""
    let relatedRows = ""
    if (albums.albums !== undefined && albums.singles !== undefined && relatedArtists !== undefined) {
        let albumList = albums.albums.map(each =>
            <ArtistTrackCard imgSrc={each.get("albumImg")} albumId={each.get("albumId")} albumName={each.get("albumName")} />)
        albumRows = formatRowDisplay(albumList)
        let singleList = albums.singles.map(each =>
            <ArtistTrackCard imgSrc={each.get("albumImg")} albumId={each.get("albumId")} albumName={each.get("albumName")} />)
        singleRows = formatRowDisplay(singleList)
        let relatedList = relatedArtists.map(each =>
            <ArtistCard imgSrc={each.get("artistImg")} title={each.get("artistName")} subtitle="Artist" artistId={each.get("artistId")}
                onClick={fetchArtistPage} id={each.get("artistId")} />)
        relatedRows = formatRowDisplay(relatedList)
    }

    return (
        <div className="ArtistPage" style={{ display: "flex" }}>
            <div className="contents" style={{ display: "grid" }}>
                {currentArtist !== "" &&
                    <ArtistPageHeader imgSrc={currentArtist.get("artistImg")} artistName={currentArtist.get("artistName")}
                        key={uuidv4()} saved={saved} />}

                <div className="albums">
                    <p className="list-title"><b>Albums</b></p>
                    <div className="contents">
                        {albumRows}
                    </div>
                </div>
                <div className="albums">
                    <p className="list-title"><b>Singles and EPs</b></p>
                    <div className="contents">
                        {singleRows}
                    </div>
                </div>
                <div className="albums">
                    <p className="list-title"><b>Related Artists</b></p>
                    <div className="contents">
                        {relatedRows}
                    </div>
                </div>
            </div>
        </div>)
}