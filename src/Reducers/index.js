import { combineReducers } from 'redux'
import ArtistReducer from "./Artist.reducer"
import UserReducer from "./User.reducer"
import AlbumReducer from "./Album.reducer"
import TrackReducer from "./Track.reducer"
import LibraryReducer from "./Library.reducer"
import PlayerReducer from "./Player.reducer"

const RootReducer = combineReducers({
    ArtistReducer,
    UserReducer,
    AlbumReducer,
    TrackReducer,
    LibraryReducer,
    PlayerReducer
});

export default RootReducer;