export function songReducer(state, action){
    switch(action.type){
        case 'PLAY_SONG':
            return { ...state, isPlaying: true }
        case 'PAUSE_SONG':
            return { ...state, isPlaying: false }
        case 'CHANGE_SONG':
            return { ...state, song : action.payload.musica }
        default:
            return state;
    }
}

export function queueReducer(state, action){
    switch(action.type){
        case 'ADD_QUEUE':
            if(state.includes(action.payload.musica))
                return state;
            return [...state, action.payload.musica];
        case 'REMOVE_QUEUE':
            return state.filter((song) => song.id !== action.payload.musica.id);

        default:
            return state;
    }
}