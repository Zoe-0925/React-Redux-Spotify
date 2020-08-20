import React, { useRef, useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useBookSearch from "../../../core/track/UseLoadTracks"
import TracklistItemNew from "../track-card/TracklistItem"
import { store } from "../../../index"
import { getTrackToToggle } from "../../../core/Selectors"

export default function SavedTracks() {
    const [pageNumber, setPageNumber] = useState(1)
    const [trackSaved, setTrackSaved] = useState([])

    const storeState = store.getState()

    const { loading, error, tracks, hasMore } = useBookSearch(pageNumber)

    useEffect(() => {
        //fetch the top 10 tracks and save to the local state.

        //when scroll, fetch another 10 tracks and append to the local state

    }, [pageNumber])

    useEffect(() => {
        const tracksToToggle = getTrackToToggle(storeState)
        if (tracksToToggle.length !== 0) {
            setTrackSaved(getTrackToToggle(storeState))
        }
    }, [storeState.TrackReducer])

    const observer = useRef()
    const lastTrackElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            console.log("entries", entries, entries[0])
            // TODO wrong entries[0].isIntersecting
            if (entries[0].isIntersecting && hasMore) {
                //TODO isIntersecting??????

                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <div>
            <ul className="songList">
                {tracks !== undefined && tracks.map((each, index) => {
                    if (tracks.length === index + 1) {
                        return (<TracklistItemNew saved={trackSaved[tracks.indexOf(each)]}
                            index={tracks.indexOf(each)} key={uuidv4()}
                            previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                            next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                        />)
                    }
                    else {
                        return (
                            <TracklistItemNew saved={trackSaved[tracks.indexOf(each)]}
                                index={tracks.indexOf(each)} key={uuidv4()}
                                previous={tracks[tracks.indexOf(each) > 0 ? tracks.indexOf(each) - 1 : 0]}
                                next={tracks[tracks.indexOf(each) + 1 <= tracks.length ? tracks.indexOf(each) + 1 : -1]} current={each}
                            />
                        )
                    }
                })}
            </ul>
        </div>
    )
}