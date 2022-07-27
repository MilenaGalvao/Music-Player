import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { HeadsetTwoTone } from '@mui/icons-material';


export default function Header(){
    return(
        <AppBar position="fixed" color="secondary">
            <Toolbar>
                <HeadsetTwoTone style={{ fontSize: '30px' }} />
                <Typography variant='h6' component="h1" style={{ marginLeft: '8px' }}>Aplicativo de Música</Typography>
            </Toolbar>
        </AppBar>
    )
}