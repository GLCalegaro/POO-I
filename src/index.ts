import express, { Request, Response } from 'express';
import cors from 'cors';
// import { db } from './database/BaseDatabase';
import { Videos } from './models/videos';
import { TVideoDB, TVideoDBPost } from './models/types';
import { VideoDatabase } from './database/VideoDatabase';
import { VideosController } from './controller/VideosController';
import { title } from 'process';

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

//Ping
app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
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
})

const videoController = new VideosController()

//Get Videos
app.get("/videos", videoController.getAllVideos)

// //Post Videos
app.post("/videos", videoController.createVideos)

// //Edit Videos
app.put("/videos/:id", videoController.editVideos)

//Remove video by ID
app.delete("/videos/:id", videoController.removeVideos)