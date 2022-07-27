import { SubscriptionsTwoTone } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import YouTubePlayer from 'react-player/youtube';
import ReactPlayer from 'react-player';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../graphql/mutation';

const DEFAULT_SONG = {
    id: "",
    duration: 0,
    title: "",
    artist: "",
    thumbnail: "",
    url: ""
};

export default function AdicionaMusica(){
    const [dialog, setDialog] = React.useState(false);
    const [url, setUrl] = React.useState("");
    const [playable, setPlayable] = React.useState(false);
    const [song, setSong] = React.useState(DEFAULT_SONG);
    const [addSong] = useMutation(ADD_SONG);

    React.useEffect(() => {
        setPlayable(YouTubePlayer.canPlay(url));
    }, [url]);

    function handleEditSong({player}){
        if(playable){
            const realPlayer = player.player.player;
            const { author, video_id, title } = realPlayer.getVideoData();

            const newSong = {
                artist: author,
                id: video_id,
                title,
                duration: realPlayer.getDuration(),
                thumbnail: `http://img.youtube.com/vi/${video_id}/0.jpg`
            }
            setSong({...newSong, url});
        }
    }

    function handleEditDataSong(event){
        const { name, value } = event.target;
        setSong(prevSong => ({
            ...prevSong,
            [name] : value
        }));
    }

    async function handleAddSong(){
        const { duration, title, artist, thumbnail, url } = song;
        try{
            await addSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    title: title.length > 0 ? title : null,
                    duration: duration > 0 ? duration : null,
                    artist: artist.length > 0 ? artist : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null
                }
            });
            setDialog(false);
            setSong(DEFAULT_SONG);
            setUrl("");
        }catch(e){
            alert(`Não foi possível adicionar a música (${e})`);
        }
    }

    return(
        <>
            <Dialog open={dialog}>
                <DialogTitle>Editar Música</DialogTitle>
                <DialogContent style={{ textAlign: 'center' }}>
                    <img style={{ width: '90%' }} src={song.thumbnail} alt="Imagem da Música"/>
                    <TextField onChange={handleEditDataSong} style={{ marginTop: '10px'}} variant="outlined" name="title" value={song.title} label="Nome da Música" fullWidth />
                    <TextField onChange={handleEditDataSong} style={{ marginTop: '10px'}} variant="outlined" value={song.artist} name="artist" label="Nome do Artista" fullWidth/>
                    <TextField onChange={handleEditDataSong}  style={{ marginTop: '10px'}} variant="outlined" value={song.thumbnail} name="thumbnail" label="Imagem" fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={()=>setDialog(false)} color="secondary">Cancelar</Button>
                    <Button variant='contained' onClick={handleAddSong} color="secondary">Salvar</Button>
                </DialogActions>
            </Dialog>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField style={{ margin: 10 }} variant='outlined' fullWidth type="url" label="Url da música" value={url} onChange={(e)=>setUrl(e.target.value)} />
                <Button disabled={!playable} style={{ padding: 15 }} onClick={()=>setDialog(true)} startIcon={<SubscriptionsTwoTone />} variant="contained" color="secondary">Adicionar</Button>
            </div>

            <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </>
    )
}