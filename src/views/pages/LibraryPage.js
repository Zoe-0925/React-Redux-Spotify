import React, { useState } from 'react';
import AlbumCard from "../components/track-card/AlbumCard"
import ArtistCard from "../components/track-card/ArtistCard"
import TracklistItem from "../components/track-card/TracklistItem"
import { useDispatchLibraryPage, useSavedTracks } from "./CustomHooks"
import { ListItem, ListItemText } from '@material-ui/core';

export const SavedTracks = () => {
    const { trackSaved, tracks, lastTrackElementRef } = useSavedTracks

    return (
        <ul className="songList">
            {tracks !== undefined && tracks.map((each, index) => {
                if (tracks.length === index + 1) {
                    return (<TracklistItem saved={trackSaved[tracks.indexOf(each)]}
                        index={tracks.indexOf(each)} key={uuidv4()}
                        previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                        next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                    />)
                }
                else {
                    return (
                        <TracklistItem saved={trackSaved[tracks.indexOf(each)]}
                            index={tracks.indexOf(each)} key={uuidv4()}
                            previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                            next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                        />
                    )
                }
            })}
        </ul>
    )
}

export default function LibraryPage() {
    const [view, setView] = useState("albums")

    const { savedArtists, savedAlbums } = useDispatchLibraryPage()

    return (
        <div className="LibraryPage" >
            <div className="head-row" >
                <ListItem className="tab" button onClick={() => setView("albums")}>
                    <ListItemText className={view === "albums" ? "library-tab selected" : "library-tab"} primary="Albums" />
                </ListItem>
                <ListItem className="tab" button onClick={() => setView("artists")}>
                    <ListItemText className={view === "artists" ? "library-tab selected" : "library-tab"} primary="Artists" />
                </ListItem>
                <ListItem className="tab" button onClick={() => setView("songs")}>
                    <ListItemText className={view === "songs" ? "library-tab selected" : "library-tab"} primary="Songs" />
                </ListItem>
            </div>
            <div className="list" >
                {view === "albums" && savedAlbums !== undefined && savedAlbums.length > 0 && savedAlbums.map(each =>
                    <AlbumCard title={each.get("albumName")} subtitle={each.get("artistNames")}
                        artistIds={each.get("artistIds")} albumId={each.get("albumId")} imgSrc={each.get("albumImg")}
                    />)}
                {view === "artists" && savedArtists !== undefined && savedArtists.length > 0 && savedArtists.map(each =>
                    <ArtistCard title={each.get("artistName")} round={true}
                        subtitle="Artist" artistId={each.get("artistId")} imgSrc={each.get("artistImg")} />)}
                {view === "songs" &&
                    <SavedTracks />
                }
            </div>
        </div>
    )
}