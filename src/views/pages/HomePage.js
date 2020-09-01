import React from "react";
import TrackCardList from "../components/tracklist/TrackCardList"
import { RECENTLY_PLAYED, USERS_TOP_TRACKS, } from "../../core/Constants"
import { getRecentlyPlayed, getUserTopTracks } from "../../core/Selectors"
import { useSelector } from "react-redux"

export default function Homepage() {
        const recentlyPlayedAlbumIds = useSelector(getRecentlyPlayed)
        const userTopAlbumIds = useSelector(getUserTopTracks)

        console.log("homepage", recentlyPlayedAlbumIds)
        console.log(userTopAlbumIds)

        /**
         *   if (albums.length === 0 && libraryReducer.get(USERS_TOP_TRACKS).length === 0) {
                        //get the token from the local storage, and save the token, and init home page
                }
         */

        return (
                <div className="Homepage">
                        <TrackCardList fetchList={RECENTLY_PLAYED} albumIds={recentlyPlayedAlbumIds}
                                limits={6}
                        />
                        <TrackCardList
                                fetchList={USERS_TOP_TRACKS} albumIds={userTopAlbumIds} limits={6} />
                </div>)
}