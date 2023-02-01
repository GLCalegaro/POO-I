import { Request, Response } from "express";
import { VideoDatabase } from "../database/VideoDatabase";
import { Videos } from "../models/videos";
import { TVideoDB, TVideoDBPost } from "../models/types";

export class VideosController {
    public getAllVideos =  async (req: Request, res: Response) => {
   
        try {
            const q = req.query.q as string | undefined
    
            const videosDatabase = new VideoDatabase
            const videosDB = await videosDatabase.findVideos(q)
    
            const videos: Videos[] = videosDB.map((videosDB) => new Videos(
                videosDB.id,
                videosDB.title,
                videosDB.duration,
                videosDB.upload_at
            ))
    
            res.status(200).send(videos)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    public createVideos = async (req: Request, res: Response) => {
        try {
            const { id, title, duration } = req.body
    
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            if (typeof title !== "string") {
                res.status(400)
                throw new Error("'title' deve ser string")
            }
    
            if (typeof duration !== "number") {
                res.status(400)
                throw new Error("'duration' deve ser string")
            }
    
    //         const [ videoDBExists ]: TVideoDB[] | undefined[] = await db("videos").where({ id });
    
            const videosDatabase = new VideoDatabase()
    
            const videosDBExists = await videosDatabase.findVideosById(id)
            const newVideo = new Videos(id, title, duration, new Date().toISOString());
    
            if (videosDBExists) {
                res.status(400)
                throw new Error("'id' de vídeo já existe!")
                upload_at: newVideo.getUploadAt()
            }
    
            const newVideoDB: TVideoDBPost = {
                id: newVideo.getId(),
                title: newVideo.getTitle(),
                duration: newVideo.getDuration()
            }
            await videosDatabase.insertVideo(newVideoDB)
    
           
    
            res.status(201).send(newVideo)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editVideos = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const { newTitle, newDuration }  = req.body
    
            if(!id && !newTitle && !newDuration){
                res.status(400)
                throw new Error("ERRO!")
        }
    
        if (id !== undefined){
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'ID' deve ser string")
            }
        }
            if (newTitle !== undefined){
            if (typeof newTitle !== "string") {
                res.status(400)
                throw new Error("'Title' deve ser string")
            }
        }
        if (newDuration !== undefined){
            if (typeof newDuration !== "number") {
                res.status(400)
                throw new Error("'Duration' deve ser number")
            }
        }
            const videosDatabase = new VideoDatabase()
            const videosDBExists = await videosDatabase.findVideosById(id)
    
                if (!videosDBExists) {
                    res.status(400)
                    throw new Error("'Id' não consta na base de dados para edição")
                }
    
            const updatedVideo = {
                id: id || videosDBExists.id,
                title: newTitle || videosDBExists.title,
                duration: newDuration || videosDBExists.duration,
                upload_at: videosDBExists.upload_at
            }
    
                    await videosDatabase.updateVideoById(id, updatedVideo)
        
            res.status(200).send({message: "Dados de vídeo atualizados com sucesso!"})
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    public removeVideos = async (req: Request, res: Response) => {
        try {
            const idToRemove = req.params.id
    
            if (typeof idToRemove !== "string") {
                res.status(400)
                throw new Error("'Id' deve ser string")
            }
    
            const videosDatabase = new VideoDatabase()
            await videosDatabase.removeVideoById(idToRemove)
    
            if (!idToRemove) {
                res.status(400)
                throw new Error("'Id' não pode ser excluida pois não existe do banco de dados!")
            }
        res.status(200).send({message: `'Id' de vídeo removida com sucesso!`})
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

}