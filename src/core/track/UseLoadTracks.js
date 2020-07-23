import { useEffect, useState } from 'react'
import { api_base_url } from "../Constants"
import { createRequest, convertToMin } from "../utils/Utils"
import { store } from "../../index"
import createTrack from "./Track"
import createArtist from "../artist/Artist"


export default function useBookSearch(pageNumber) {
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