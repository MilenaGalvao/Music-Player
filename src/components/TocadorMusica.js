import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { Card, CardContent, CardActions, IconButton, Typography, Slider, CardMedia, useMediaQuery } from '@mui/material';
import React from 'react';
import { SongContext } from '../App';
import FilaMusica from './FilaMusica';
import ReactPlayer from 'react-player';

export default function TocadorMusica({ queue }){
    const telaGrande = useMediaQuery('(min-width: 900px)');
    const { currentSong, songDispatch } = React.useContext(SongContext);
    const [played, setPlayed] = React.useState(0);
    const [changing, setChanging] = React.useState(false);
    const reactPlayerRef = React.useRef();
    const [playedSeconds, setPlayedSeconds] = React.useState(0);
    const [posicaoNaFila, setPosicaoNaFila] = React.useState(0);

    React.useEffect(()=>{
        const songIndex = queue.currentQueue.findIndex((song)=>song.id === currentSong.song.id);
        setPosicaoNaFila(songIndex);
    },[queue, currentSong.song.id]);

    React.useEffect(()=>{
        if(played > 0.99)
            handleSongNext();
    },[played]);


    function handlePlayButton(){
        songDispatch({ type: currentSong.isPlaying ? "PAUSE_SONG" : "PLAY_SONG" });
    }

    function handleSongProgress({ played, playedSeconds }){
        if(!changing)
            setPlayed(played);
        setPlayedSeconds(playedSeconds);
    }

    function handleSliderChanging(){
        //Mouse Down
        setChanging(true);
    }

    function handleSliderChanged(){
        //Mouse UP
        setChanging(false);
    }


    function handleSliderChange(event, newValue){
        setPlayed(newValue);
        reactPlayerRef.current.seekTo(played);
    }

    function handleSongPrevious(){
        const nextSong = queue.currentQueue[posicaoNaFila - 1];
        if(nextSong)
            songDispatch({ type: "CHANGE_SONG", payload: { musica: nextSong } });
    }

    function handleSongNext(){
        const nextSong = queue.currentQueue[posicaoNaFila + 1];
        if(nextSong)
            songDispatch({ type: "CHANGE_SONG", payload: { musica: nextSong } });
    }

    return(
        <>
            <Card style={{ display:'flex', flexDirection:'column' , margin: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">{currentSong.song.title}</Typography>
                        <Typography variant="subtitle1" component="h3">{currentSong.song.artist}</Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={handleSongPrevious}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handlePlayButton}>
                           { currentSong.isPlaying ? <Pause style={{fontSize: '40px'}} /> : <PlayArrow style={{fontSize: '40px'}} /> }
                        </IconButton>
                        <IconButton onClick={handleSongNext}>
                            <SkipNext />
                        </IconButton>
                        <Typography>
                            { new Date(playedSeconds * 1000).toISOString().substr(11,8) }
                        </Typography>
                    </CardActions>
                    <CardMedia style={{ width: '140px', height: '140px'}} image={currentSong.song.thumbnail} />
                </div>
                <Slider key="slider" value={played} type="range" min={0} max={1} step={0.01} style={{ marginLeft: '30px', width: '90%' }} 
                    onChange={handleSliderChange} onMouseDown={handleSliderChanging} onMouseUp={handleSliderChanged}
                />
                <ReactPlayer ref={reactPlayerRef} hidden url={currentSong.song.url} playing={currentSong.isPlaying} onProgress={handleSongProgress} />
            </Card>
            {
                telaGrande &&
                <FilaMusica queue={queue} />
            }
        </>
    )
}