import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../core/artist/Actions"
import { fetchAlbumTracksLoading } from "../../core/track/Actions"
import history from "../../core/history"
import { getSavedAlbums, getSavedArtists, getTrackToToggle} from "../../core/Selectors"
import { loadLibraryPage } from "../../core/library/Actions"

import { api_base_url } from "../../core/Constants"
import { createRequest, convertToMin } from "../../core/utils/Utils"
import { store } from "../../index"
import createTrack from "../../core/track/Track"
import createArtist from "../../core/artist/Artist"


export default function useLoadTracks(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tracks, setTracks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        const offset = pageNumber > 1 ? (pageNumber - 1) * 10 : 0
        const url = api_base_url + "me/tracks?limit=10&offset=" + offset
        const token = store.getState().UserReducer.accessToken
        var myRequest = createRequest(token, url, "GET")
        fetch(myRequest).then((response) => {
            response.json().then(
                data => {
                    if (data === undefined) { return }
                    let newTracks = []
                    data.items.map(
                        each => {
                            let artists = each.track.artists.map(eachArtist => createArtist(eachArtist.id, eachArtist.name, ""))
                            tracks.push(createTrack(each.track.id, each.track.name, convertToMin(each.track.duration_ms), each.track.preview_url, artists))
                        }
                    )
                    setHasMore(data.total > offset + 10)
                    setTracks(tracks.concat(newTracks))
                    setLoading(false)
                })

        }).catch(e => {
            setError(true)
        })
    }, [pageNumber])

    return { loading, error, tracks, hasMore }
}

export const useDispatchArtistPage = () => {
    const dispatch = useDispatch()

    const fetchTracks = useCallback(
        (e) => dispatch(fetchAlbumTracksLoading(e.target.id)),
        [dispatch]
    )

    const fetchArtistPage = useCallback(
        (e) => {
            dispatch(fetchArtistsAlbumsLoading(e.target.id))
            history.push("/albums")
        },
        [dispatch],
    )

    return { fetchTracks, fetchArtistPage }
}

export const useDispatchLibraryPage = () => {
    const dispatch = useDispatch()

    const savedArtists = useSelector(getSavedArtists)
    const savedAlbums = useSelector(getSavedAlbums)


    const fetchLibrary = useCallback(() => {
        dispatch(loadLibraryPage())
    }, [dispatch])


    useEffect(() => {
        if (savedAlbums !== undefined && savedAlbums.length === 0) {
            fetchLibrary()
        }
    }, [savedAlbums, savedArtists])

    return { savedArtists, savedAlbums }
}

export const useSavedTracks = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const trackSaved = useSelector(getTrackToToggle)

    const { loading, error, tracks, hasMore } = useLoadTracks(pageNumber)

    useEffect(() => {
        //fetch the top 10 tracks and save to the local state.
        //when scroll, fetch another 10 tracks and append to the local state

    }, [pageNumber])


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

    return { trackSaved, tracks, lastTrackElementRef }
}