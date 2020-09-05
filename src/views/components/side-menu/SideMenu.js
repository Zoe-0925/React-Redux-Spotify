import React from "react";
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import history from "../../../core/history"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function SideMenu() {

    return (
        <div className="SideMenu">
            <div className="container">
                <ListItem className="link" button onClick={() => history.push("/Home")}>
                    <ListItemIcon>
                        <HomeOutlinedIcon className="nav-icon" fontSize='inherit' />
                    </ListItemIcon>
                    <ListItemText className="nav-item" primary="Home" />
                </ListItem>
                <ListItem className="link" button onClick={() => history.push("/search")}>
                    <ListItemIcon>
                        <SearchOutlinedIcon className="nav-icon" fontSize='inherit' />
                    </ListItemIcon>
                    <ListItemText className="nav-item" primary="Search" />
                </ListItem>
                <ListItem className="link" button onClick={() => history.push("/library")}>
                    <ListItemIcon>
                        <LibraryMusicOutlinedIcon className="nav-icon" fontSize='inherit' />
                    </ListItemIcon>
                    <ListItemText className="nav-item" primary="Your Library" />
                </ListItem>
                <p className="nav-divider" >PLAYLISTS</p>
                <ListItem className="link" button onClick={() => history.push("/create-playlist")}>
                    <ListItemIcon>
                        <AddBoxIcon className="nav-icon" fontSize='inherit' color='inherit' />
                    </ListItemIcon>
                    <ListItemText className="nav-item" primary="Create Playlist" />
                </ListItem>
            </div>
        </div>
    )
}