import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux"
import history from "../Components/history"
import { fetchArtistsAlbumsLoading } from "../Actions/ArtistActions"
import { fetchAlbumTracksLoading } from "../Actions/TrackActions"
import { toggleTrack } from "../Actions/LibraryActions"
import { play, pause } from '../Actions/PlayerActions';
import { getSavedAlbums, getSavedArtists, getTrackToToggle } from "../Reducers/Selectors"
import { loadLibraryPage } from "../Actions/LibraryActions"
import { api_base_url } from "../Components/Constants"
import { createRequest, convertToMin } from "../Components/Utils/Utils"
import { store } from "../index"
import createTrack from "../Components/TrackCard/Track"
import createArtist from "../Components/Artist/Artist"

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

export const useFetchAlbumPage = () => {
    const dispatch = useDispatch()

    const fetchTracks = useCallback(id => {
        dispatch(fetchAlbumTracksLoading(id))
        history.push("/albums")
    },
        [dispatch]
    )

    return { fetchTracks }
}

export const useFetchArtistPage = () => {
    const dispatch = useDispatch()

    const fetchArtistPage = useCallback(id => {
        dispatch(fetchArtistsAlbumsLoading(id))
        history.push("/artists")
    },
        [dispatch],
    )

    return { fetchArtistPage }
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

    /** 
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
    */
    return { trackSaved, tracks }
}

export const useSaveArtist = () => {
    const dispatch = useDispatch()

    const fetchToggleFollowArtist = useCallback(id => {
        //TODO

    },
        [dispatch]
    )

    return { fetchToggleFollowArtist }
}

//TODO highly buggy. Check
export const useSaveTrack = (initialSaved) => {
    const [saved, setSaved] = useState(initialSaved)

    const dispatch = useDispatch()

    const handleToggleTrack = useCallback(
        (id, index) => dispatch(toggleTrack(id, index)), [dispatch]
    )

    const toggleSave = () => {
        setSaved(saved => !saved)  //Update the local state
        handleToggleTrack()    //Update the global state to sync with the local state
    }

    return { saved, toggleSave }
}

export const usePlayTrack = (current) => {
    const [playIcon, setPlayIcon] = useState(true)

    const dispatch = useDispatch()

    const dispatchPlay = useCallback(
        (current) => dispatch(play(current),
            [dispatch]
        ))

    const dispatchPause = useCallback(
        () => dispatch(pause()), [dispatch]
    )

    function playTrack(current) {
        setPlayIcon(false)
        dispatchPlay(current)
    }

    function pauseTrack() {
        setPlayIcon(true)
        dispatchPause()
    }

    return { playIcon, playTrack, pauseTrack }
}

