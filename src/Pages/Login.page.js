import React, { useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import { authorization_base_url, scope, client_id, redirect_url, response_type } from "../Components/Constants"
import { saveAccessToken } from "../Actions/UserActions"

export default function Login({ setShow }) {
    const url = `${authorization_base_url}client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope.join("%20")}&response_type=${response_type}`
    const dispatchStore = useDispatch()

    //Save the access token to the store
    const dispatchSaveToken = useCallback(
        accessToken => {
            dispatchStore(saveAccessToken(accessToken))
            setShow(true)
        },
        [useDispatch()]
    )

    useEffect(() => {
        let hashParams = {};
        let e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        if (!hashParams.access_token) {
            window.location.href = url;
        } else {
            dispatchSaveToken(hashParams.access_token)
        }
    }, [window.location.href])

    return (
        <div className="container">
            <img className="background" src={require("./4.jpg")} alt="background"></img>
            <Button className="Login" href={url}
                style={{ color: "white", fontSize: "3rem", backgroundColor: "#0a0a0a" }}>
                Loading Your Spotify Page</Button>
        </div>
    );
}