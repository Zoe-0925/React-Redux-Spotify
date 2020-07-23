// mock request for "fetchRecentPlayed"
const data_1 =
{
    items: [
        {
            "track": {
                "album": {
                    "album_type": "album",
                    "artists": [
                        {
                            "id": "17lzZA2AlOHwCwFALHttmp",
                            "name": "2 Chainz",

                        }
                    ],
                    "id": "1BR69wIifGZUSimcuTjWVg",
                    "images": [
                        {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b27384f49cbc39ac1f18422a4d42",
                            "width": 640
                        },
                        {
                            "height": 300,
                            "url": "https://i.scdn.co/image/ab67616d00001e0284f49cbc39ac1f18422a4d42",
                            "width": 300
                        },
                    ],
                    "name": "Rap Or Go To The League",
                    "type": "album",
                },
                "artists": [
                    {
                        "id": "17lzZA2AlOHwCwFALHttmp",
                        "name": "2 Chainz",
                    },
                    {
                        "id": "66CXWjxzNUsdJxJ2JdwvnR",
                        "name": "Ariana Grande",
                    }
                ],
                "duration_ms": 245893,
                "id": "1R6VwZ8TuHRzxZUxe88n4I",
                "name": "Rule The World (feat. Ariana Grande)",
                "preview_url": "https://p.scdn.co/mp3-preview/b9313b509b29e7dda36f44ac50f40505bc883277?cid=774b29d4f13844c495f206cafdad9c86",
                "type": "track",
            }
        }]
}

// mock request for "fetchUsersTopTracks", "fetchTracksForAlbum", "fetchArtistsAlbums",
//"fetchSavedAlbums", 
//"
const data_2 = {
    items: [
        {
            "album": {
                "album_type": "album",
                "artists": [
                    {
                        "id": "17lzZA2AlOHwCwFALHttmp",
                        "name": "2 Chainz",

                    }
                ],
                "id": "1BR69wIifGZUSimcuTjWVg",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b27384f49cbc39ac1f18422a4d42",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e0284f49cbc39ac1f18422a4d42",
                        "width": 300
                    },
                ],
                "name": "Rap Or Go To The League",
                "type": "album",
            },
            "artists": [
                {
                    "id": "17lzZA2AlOHwCwFALHttmp",
                    "name": "2 Chainz",
                },
                {
                    "id": "66CXWjxzNUsdJxJ2JdwvnR",
                    "name": "Ariana Grande",
                }
            ],
            "duration_ms": 245893,
            "id": "1R6VwZ8TuHRzxZUxe88n4I",
            "name": "Rule The World (feat. Ariana Grande)",
            "preview_url": "https://p.scdn.co/mp3-preview/b9313b509b29e7dda36f44ac50f40505bc883277?cid=774b29d4f13844c495f206cafdad9c86",
            "type": "track",
        }
    ]
}

// mock request for "fetchSearchResults", "fetchSavedArtists"
//"
const data_2 = {
    artists: {
        items: [
            {
                "album": {
                    "album_type": "album",
                    "artists": [
                        {
                            "id": "17lzZA2AlOHwCwFALHttmp",
                            "name": "2 Chainz",

                        }
                    ],
                    "id": "1BR69wIifGZUSimcuTjWVg",
                    "images": [
                        {
                            "height": 640,
                            "url": "https://i.scdn.co/image/ab67616d0000b27384f49cbc39ac1f18422a4d42",
                            "width": 640
                        },
                        {
                            "height": 300,
                            "url": "https://i.scdn.co/image/ab67616d00001e0284f49cbc39ac1f18422a4d42",
                            "width": 300
                        },
                    ],
                    "name": "Rap Or Go To The League",
                    "type": "album",
                },
                "artists": [
                    {
                        "id": "17lzZA2AlOHwCwFALHttmp",
                        "name": "2 Chainz",
                    },
                    {
                        "id": "66CXWjxzNUsdJxJ2JdwvnR",
                        "name": "Ariana Grande",
                    }
                ],
                "duration_ms": 245893,
                "id": "1R6VwZ8TuHRzxZUxe88n4I",
                "name": "Rule The World (feat. Ariana Grande)",
                "preview_url": "https://p.scdn.co/mp3-preview/b9313b509b29e7dda36f44ac50f40505bc883277?cid=774b29d4f13844c495f206cafdad9c86",
                "type": "track",
            }
        ]
    },
    tracks: {
        items: [
            {
                "id": "1BR69wIifGZUSimcuTjWVg",
                "name": "Rap Or Go To The League",
                artists: [
                    {
                        "id": "17lzZA2AlOHwCwFALHttmp",
                        "name": "2 Chainz",
                    },
                ],
                duration_ms: 245893,
                "preview_url": "https://p.scdn.co/mp3-preview/b9313b509b29e7dda36f44ac50f40505bc883277?cid=774b29d4f13844c495f206cafdad9c86",
                "type": "track",
            }
        ]
    },
    albums: {
        items: [
            {
                "id": "1BR69wIifGZUSimcuTjWVg",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b27384f49cbc39ac1f18422a4d42",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e0284f49cbc39ac1f18422a4d42",
                        "width": 300
                    },
                ],
                "name": "Rap Or Go To The League",
            }
        ]
    },
    playlists: {
        items: [
            {
                "id": "1BR69wIifGZUSimcuTjWVg",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b27384f49cbc39ac1f18422a4d42",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e0284f49cbc39ac1f18422a4d42",
                        "width": 300
                    },
                ],
                "name": "Rap Or Go To The League",
                "owner": { "display_name": "Spotify" }
            }
        ]
    }
}

//mock data for fetchAlbumById
const data_3 = {
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b27384f49cbc39ac1f18422a4d42",
            "width": 640
        },],
    "id": "1BR69wIifGZUSimcuTjWVg",
    "name": "Rap Or Go To The League",
    "album_type": "album",
}

//mock data for fetchArtistById
const data_4 = {
    "images": [
        {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b27384f49cbc39ac1f18422a4d42",
            "width": 640
        },],
    "id": "1BR69wIifGZUSimcuTjWVg",
    "name": "Rap Or Go To The League",
}

//mock data fro fetchSavedTracks
const data_5 = {
    items: [{
        "id": "1BR69wIifGZUSimcuTjWVg",
        "name": "Rap Or Go To The League",
        artists: [
            {
                "id": "17lzZA2AlOHwCwFALHttmp",
                "name": "2 Chainz",
            },
        ],
        duration_ms: 245893,
        "preview_url": "https://p.scdn.co/mp3-preview/b9313b509b29e7dda36f44ac50f40505bc883277?cid=774b29d4f13844c495f206cafdad9c86",
        "type": "track",
    }
    ]
}

