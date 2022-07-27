import { gql } from "@apollo/client";

export const ADD_SONG = gql`
    mutation addSong($artist: String!, $duration: Float!, $thumbnail: String!, $title: String!, $url: String!) {
        insert_songs(objects: {artist: $artist, duration: $duration, thumbnail: $thumbnail, title: $title, url: $url}) {
            affected_rows
        }
    }`;