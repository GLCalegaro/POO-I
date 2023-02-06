import { Request, Response } from "express";
import { VideoDatabase } from "../database/VideoDatabase";
import { Videos } from "../models/videos";
import { TVideoDB, TVideoDBPost } from "../models/types";
import { VideoBusiness } from "../business/VideoBusiness";

export class VideosController {
    public getAllVideos =  async (req: Request, res: Response) => {
   
        try {
            const q = req.query.q as string | undefined
    
            const videoBusiness = new VideoBusiness
            const uotput = await videoBusiness.getAllVideos(q)
    
            res.status(200).send(uotput)
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
            const input  = {
                id: req.body.id,
                title: req.body.title,
                duration: req.body.duration,
                upload_at: req.body.upload_at
            }

            //Instanciando a business
            const videoBusiness = new VideoBusiness()

            //Chamando o método da business correspondente
            const output = await videoBusiness.createVideos(input)
    
            res.status(201).send(output)
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
            const input  = {
                id: req.body.id,
                newTitle: req.body.newTitle,
                newDuration: req.body.newDuration
            }
            //Instanciando a business
            const videoBusiness = new VideoBusiness()

            //Chamando o método da business correspondente
            const output = await videoBusiness.editVideos(input)

        
            res.status(200).send(output)
    
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
    
            const videosDatabase = new VideoDatabase()
            await videosDatabase.removeVideoById(idToRemove)
    
        res.status(201).send("Video removido com sucesso!");
    
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