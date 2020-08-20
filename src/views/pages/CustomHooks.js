import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { fetchArtistsAlbumsLoading } from "../../core/artist/Actions"
import { fetchAlbumTracksLoading } from "../../core/track/Actions"
import history from "../../core/history"
import { getSavedAlbums, getSavedArtists, } from "../../core/Selectors"
import { loadLibraryPage } from "../../core/library/Actions"

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

    const { loading, error, tracks, hasMore } = useBookSearch(pageNumber)

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