import {
    Box,
    Divider,
    Drawer,
    List,
    TextField,
    Toolbar,
    Typography
} from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItem } from "./";


export const SideBar = ({ drawerWidth = 240 }) => {

    const upper=(name='')=>{
        if(name){
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
        return name='';
    }

    const { displayName } = useSelector( state=> state.auth );
    const { notes }= useSelector(state=> state.journal);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component='div' className='animate__animated animate__fadeInUp animate__faster'>
                        { upper(displayName) }
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {
                        notes.map(note => (

                            <SideBarItem key={note.id} {...note}/>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
