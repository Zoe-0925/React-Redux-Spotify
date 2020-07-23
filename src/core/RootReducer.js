import { combineReducers } from 'redux'
import ArtistReducer from "./artist/ArtistReducer"
import UserReducer from "./user/UserReducer"
import AlbumReducer from "./album/AlbumReducer"
import TrackReducer from "./track/TrackReducer"
import LibraryReducer from "./library/LibraryReducer"
import PlayerReducer from "./player/PlayerReducer"

const RootReducer = combineReducers({
    ArtistReducer,
    UserReducer,
    AlbumReducer,
    TrackReducer,
    LibraryReducer,
    PlayerReducer
});

export default RootReducer;