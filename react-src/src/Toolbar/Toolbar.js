import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { filesystem, window as neutralinojsWindow } from "@neutralinojs/lib";
import { WhatsWebURL } from '../util/Constants';

export default function AppToolbar() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const onLogin = () => {
        setIsLoggedIn(true);
        window.enableInspector = true;
    };

    const onConnect = () => {
        neutralinojsWindow.create(WhatsWebURL, {
            enableInspector: true,
            width: 500,
            height: 300,
            maximizable: false,
            exitProcessOnClose: true,
        }).then(result => {
            console.log(result);
        })
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CJS Whatsapp Messaging
                    </Typography>
                    <Button color="inherit" onClick={onConnect}>Connect</Button>
                    {!isLoggedIn && <Button color="inherit" onClick={onLogin}>Login</Button>}
                    {isLoggedIn && <>
                        <Button color="inherit">Open</Button>
                        <Button color="inherit">Save</Button>
                    </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}