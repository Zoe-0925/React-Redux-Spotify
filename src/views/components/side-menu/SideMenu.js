import React from "react";
import { ListItem } from '@material-ui/core';
import history from "../../../core/history"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

export default function SideMenu() {
    //TODO this side menu did not fetch data.
    //So someone needs to do something...

    return (
        <div className="SideMenu">
            <ListItem className="link" button onClick={() => history.push("/Home")}>
                <HomeOutlinedIcon />
                <p className="nav-item">Home</p>
            </ListItem>
            <ListItem className="link" button onClick={() => history.push("/search")}>
                <SearchOutlinedIcon />
                <p className="nav-item">Search</p>
            </ListItem>
            <ListItem className="link" button onClick={() => history.push("/library")}>
                <p className="nav-item" >Your Library</p>
            </ListItem>
            <p className="nav-divider" >PLAYLISTS</p>
            <ListItem className="link" button onClick={() => history.push("/create-playlist")}>
                <p className="nav-item">Create Playlist</p>
            </ListItem>
        </div>
    )
}