import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack } from '@mui/material';
import CommentIcon from "@mui/icons-material/Comment";
import SaveIcon from "@mui/icons-material/FileDownload"
import FileOpenIcon from "@mui/icons-material/FileOpen"

class Client {
    id = 0;
    name = "Test User";
    phoneNumber = "8777236666";
    countryCode = "91"
}

const getDummyClients = () => {
    return Array.from({ length: 10 }).map((_, i) => i).map(i => {
        const c = new Client();
        c.id = i + 1;
        c.name = `${c.name} ${i}`;
        return c;
    })
}

export default function Clients() {

    const [checked, setChecked] = React.useState([0]);
    const [clients, setClients] = React.useState(getDummyClients())

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    return (
        <Box sx={{ flexGrow: 1, background: 'red', display: 'flex' }}>
            <List sx={{ flexGrow: 1, width: '100%', bgcolor: 'background.paper' }}
                subheader={
                    <ListSubheader component="div" sx={{ display: 'flex', alignItems: "flex-start", justifyItems: 'flex-start' }}>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="h6">
                                Customer Information
                            </Typography>
                        </Box>
                        <IconButton edge="end" aria-label="comments" color="primary">
                            <FileOpenIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="comments" color="primary">
                            <SaveIcon />
                        </IconButton>
                    </ListSubheader>
                }
            >
                {clients.map((client, index) => {
                    const labelId = `checkbox-list-label-${client.id}`;
                    return (
                        <>
                            <ListItem
                                key={client.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <CommentIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(client.id)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(client.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <Stack flex={1} direction="column">
                                        <ListItemText id={`${labelId}-name`} primary={`${client.name}`} />
                                        <ListItemText id={`${labelId}-phone`} secondary={`${client.phoneNumber}`} />
                                    </Stack>
                                </ListItemButton>

                            </ListItem>
                            <Divider />
                        </>
                    );
                })}
            </List>
        </Box>
    )
}