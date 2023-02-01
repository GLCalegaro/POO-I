export type TVideoDB = {
    id: string,
    title: string,
    duration: number,
    upload_at: string
}

// tipagem para criação (POST) sem upload_at
export type TVideoDBPost = {
    id: string,
    title: string,
    duration: number
}

export interface VideosDB {
    id: string,
    title: string,
    duration: number,
    upload_at: string
}