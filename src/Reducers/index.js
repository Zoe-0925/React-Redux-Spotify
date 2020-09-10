import { combineReducers } from 'redux'
import ArtistReducer from "./ArtistReducer"
import UserReducer from "./UserReducer"
import AlbumReducer from "./AlbumReducer"
import TrackReducer from "./TrackReducer"
import LibraryReducer from "./LibraryReducer"
import PlayerReducer from "./PlayerReducer"

const RootReducer = combineReducers({
    ArtistReducer,
    UserReducer,
    AlbumReducer,
    TrackReducer,
    LibraryReducer,
    PlayerReducer
});

export default RootReducer;