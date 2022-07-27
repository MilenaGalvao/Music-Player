import { PlayArrow, QueueMusic, Pause } from '@mui/icons-material';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useSubscription } from '@apollo/client'
import { GET_SONGS } from '../graphql/subscription';
import { SongContext } from '../App';

export default function ListaMusica({ queue }){
    const { data, loading, error } = useSubscription(GET_SONGS);

    if(loading) {
        return <div>Carregando...</div>
    }

    if(error) {
        console.log(error);
        return <div>ERRO</div>;
    }

    function Musica({musica}){
        const {thumbnail, artist, title} = musica;
        const [isCurrentSong, setIsCurrentSong] = React.useState(false);
        const { currentSong, songDispatch } = React.useContext(SongContext);

        React.useEffect(()=>{
            setIsCurrentSong(currentSong.song.id === musica.id && currentSong.isPlaying)
        },[currentSong.song.id, currentSong.isPlaying, musica.id])

        function handleChangeSong(){
            songDispatch({ type: "CHANGE_SONG", payload: { musica } });
            songDispatch({ type: isCurrentSong ? "PAUSE_SONG" : "PLAY_SONG" });
        }

        function handleAddQueue(){
            queue.queueDispatch({ type: "ADD_QUEUE", payload: { musica } });
        }

        return (<Card style={{ display:'flex', alignItems: 'center', margin: '10px' }}>
                <CardMedia image={thumbnail} style={{ objectFit: 'cover', width: '140px', height:'140px' }}/>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <CardContent>
                        <Typography variant='h5' component="h2">{title}</Typography>
                        <Typography variant='subtitle1' component="h3">{artist}</Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={handleChangeSong}>
                        { isCurrentSong ? <Pause color="secondary" /> : <PlayArrow color="secondary" /> }
                        </IconButton>
                        <IconButton onClick={handleAddQueue}>
                            <QueueMusic color="secondary"/>
                        </IconButton>
                    </CardActions>
                </div>
            </Card>);
    }

    return(
        <div>
            {data.songs.map((musica) => {
                return(<Musica key={musica.id} musica={musica} />)
            })}
        </div>
    )
}