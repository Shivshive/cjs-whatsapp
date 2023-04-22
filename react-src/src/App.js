import { useEffect } from 'react'
import './App.css';
import Stack from '@mui/material/Stack';
import Toolbar from "./Toolbar/Toolbar";
import Clients from "./Clients/Clients";
import Status from "./Status/Status";
import Templates from "./Templates/Templates";

// Import filesystem namespace
import { filesystem, window } from "@neutralinojs/lib";
import { Divider } from '@mui/material';

function App() {

  return (
    <div className="App">

      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        flex={1}
        spacing={0.5}
      >
        <Toolbar />
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          flex={1}
          spacing={0.5}
        >
          <Clients />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Templates />
        </Stack>
        <Status />
      </Stack>
    </div>
  );
}

export default App;