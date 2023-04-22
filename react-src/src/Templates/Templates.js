import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack } from '@mui/material';
import EditIcon from "@mui/icons-material/EditRounded";
import RunIcon from "@mui/icons-material/RunCircleTwoTone"
import FileOpenIcon from "@mui/icons-material/FileOpen"

class Template {
    id = 0;
    name = "Good Morning";
    text = "Hello!";
    image = "bg.jpg"
}

const getDummyTemplates = () => {
    return Array.from({ length: 10 }).map((_, i) => i).map(i => {
        const c = new Template();
        c.id = i + 1;
        c.name = `${c.name} ${i}`;
        return c;
    })
}

export default function Templates() {

    const [checked, setChecked] = React.useState([0]);
    const [templates, setTemplates] = React.useState(getDummyTemplates())

    const handleToggle = (value) => () => {
        if (checked === value) {
            setChecked(-1);
        }
        else {
            setChecked(value);
        }

    };


    return (
        <Box sx={{ flexGrow: 1, background: 'red', display: 'flex' }}>
            <List sx={{ flexGrow: 1, width: '100%', bgcolor: 'background.paper' }}
                subheader={
                    <ListSubheader component="div" sx={{ display: 'flex', alignItems: "flex-start", justifyItems: 'flex-start' }}>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                            <Typography variant="h6">
                                Templates
                            </Typography>
                        </Box>
                        <IconButton edge="end" aria-label="comments" color="primary">
                            <RunIcon />
                        </IconButton>
                    </ListSubheader>
                }
            >
                {templates.map((template, index) => {
                    const labelId = `checkbox-list-label-${template.id}`;
                    return (
                        <>
                            <ListItem
                                key={template.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <EditIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(template.id)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked === template.id}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <Stack flex={1} direction="column">
                                        <ListItemText id={`${labelId}-name`} primary={`${template.name}`} />
                                        <ListItemText id={`${labelId}-text`} secondary={`${template.text}`} />
                                        <ListItemText id={`${labelId}-text`} secondary={`${template.image}`} />
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