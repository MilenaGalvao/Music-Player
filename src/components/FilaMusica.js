import { Delete } from '@mui/icons-material';
import { Avatar, IconButton, Typography } from '@mui/material';
import React from 'react';

export default function FilaMusica({ queue }){
    function MusicaNaFila({musica}){
        const { thumbnail, title, artist } = musica;
        
        function handleRemoveQueue(){
            queue.queueDispatch({ type: 'REMOVE_QUEUE', payload: { musica } })
        }

        return (
            <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateColumns: '50px auto 50px', alignItems: 'center', margin: '10px' }}>
                <Avatar src={thumbnail} alt="Capa do CD" style={{ width:'40px', height: '40px'}} />
                <div>
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography variant='body2'>{artist}</Typography>
                </div>
                <IconButton onClick={handleRemoveQueue}><Delete color="error"/></IconButton>
            </div>
        );
    }

    return(
        <div>
            <Typography>Próximos da Fila ({ queue.currentQueue.length })</Typography>
            {queue.currentQueue.map((musica, index) => {
                return(<MusicaNaFila key={index} musica={musica} />)
            })}
        </div>
    )
}