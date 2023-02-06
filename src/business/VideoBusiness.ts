import { VideoDatabase } from "../database/VideoDatabase"
import { TVideoDBPost } from "../models/types"
import { Videos } from "../models/videos"

export class VideoBusiness{
    public getAllVideos = async (q: string | undefined) =>{
        const videosDatabase = new VideoDatabase
        const videosDB = await videosDatabase.findVideos(q)

        const videos: Videos[] = videosDB.map((videosDB) => new Videos(
            videosDB.id,
            videosDB.title,
            videosDB.duration,
            videosDB.upload_at
        ))
        return videos
    }


    public createVideos = async (input: TVideoDBPost) => {

        const {id, title, duration} = input

        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof title !== "string") {
            throw new Error("'title' deve ser string")
        }

        if (typeof duration !== "number") {
            throw new Error("'duration' deve ser string")
        }

//         const [ videoDBExists ]: TVideoDB[] | undefined[] = await db("videos").where({ id });

        const videosDatabase = new VideoDatabase()

        const videosDBExists = await videosDatabase.findVideosById(id)
        const newVideo = new Videos(id, title, duration, new Date().toISOString());

        if (videosDBExists) {
            throw new Error("'id' de vídeo já existe!")
            upload_at: newVideo.getUploadAt()
        }

        const newVideoDB: TVideoDBPost = {
            id: newVideo.getId(),
            title: newVideo.getTitle(),
            duration: newVideo.getDuration()
        }
        await videosDatabase.insertVideo(newVideoDB)

        const output = {
            message: "Vídeo cadastrado com sucesso!", 
            video: newVideoDB
        }
        return output
    }

    public editVideos = async (input: any) => {
        
        const {id, newTitle, newDuration} = input

        if(!id && !newTitle && !newDuration){
            throw new Error("ERRO!")
    }

    if (id !== undefined){
        if (typeof id !== "string") {
            throw new Error("'ID' deve ser string")
        }
    }
        if (newTitle !== undefined){
        if (typeof newTitle !== "string") {
            throw new Error("'Title' deve ser string")
        }
    }
    if (newDuration !== undefined){
        if (typeof newDuration !== "number") {
            throw new Error("'Duration' deve ser number")
        }
    }
        const videosDatabase = new VideoDatabase()
        const videosDBExists = await videosDatabase.findVideosById(id)

            if (!videosDBExists) {
                throw new Error("'Id' não consta na base de dados para edição")
            }

        const updatedVideo = {
            id: id || videosDBExists.id,
            title: newTitle || videosDBExists.title,
            duration: newDuration || videosDBExists.duration,
            upload_at: videosDBExists.upload_at
        }

        await videosDatabase.updateVideoById(id, updatedVideo)
        
        const output = {
            message: "O Vídeo foi editado com sucesso!", 
            video: updatedVideo
        }
        return output
    }

    public removeVideos = async (id: string | undefined) =>{

        if (typeof id !== "string") {
            throw new Error("'Id' deve ser string")
        }
        const videosDatabase = new VideoDatabase()
        const output = await videosDatabase.findVideosById(id)
        
        if (!id) {
            throw new Error("'Id' não pode ser excluida pois não existe do banco de dados!")
        }
        return output
    }
}