import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './database/knex';
import { Videos } from './models/videos';
import { TVideoDB, TVideoDBPost } from './models/types';

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

//Get Videos
app.get("/videos", async (req: Request, res: Response) => {
   
    try {
        const allVideos: TVideoDB[] = await db("videos")
        const videos: Videos[] = allVideos.map((allvideo)=>
            new Videos(
                allvideo.id,
                allvideo.title,
                allvideo.duration,
                allvideo.upload_at
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
})

//Post Videos
app.post("/videos", async (req: Request, res: Response) => {
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

        const [ videoDBExists ]: TVideoDB[] | undefined[] = await db("videos").where({ id });

        if (videoDBExists) {
            res.status(400)
            throw new Error("'id' de vídeo já existe!")
        }

        const newVideo = new Videos(id, title, duration, new Date().toISOString());

        const newVideoDB: TVideoDBPost = {
            id: newVideo.getId(),
            title: newVideo.getTitle(),
            duration: newVideo.getDuration()
        }

        await db("videos").insert(newVideoDB)

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
})

//Edit Videos
app.put("/videos/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newTitle = req.body.title
        const newDuration = req.body.duration

        if (typeof newId !== "string") {
            res.status(400)
            throw new Error("'newId' deve ser string")
        }

        if (typeof newTitle !== "string") {
            res.status(400)
            throw new Error("'newTitle' deve ser string")
        }

        if (typeof newDuration !== "number") {
            res.status(400)
            throw new Error("'newDuration' deve ser string")
        }

        const [ video ]: TVideoDB[] | undefined[] = await db("videos").where({ id: idToEdit })

        const newVideo = new Videos (
            newId,
            newTitle,
            newDuration,
            new Date().toISOString()
        )

        const newVideoDB = {
            id: newVideo.getId(),
            title: newVideo.getTitle(),
            duration: newVideo.getDuration(),
            upload_at: newVideo.getUploadAt()
        }

        if (video) {
            const updateVideos = {
                id: newVideoDB.id || video.id,
                title: newVideoDB.title || video.title,
                duration: newVideoDB.duration || video.duration,
                upload_at: newVideo.getUploadAt() || video.upload_at
            }
        

        await db("videos")
        .update(updateVideos)
        .where({ id: idToEdit })

        res.status(200).send(updateVideos)
    }else{
        res.status(404)
        throw new Error("'Id' não consta na base para edição")
    }
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

app.delete("/videos/:id", async (req: Request, res: Response) => {
    try {
        const idToRemove = req.params.id

        if (typeof idToRemove !== "string") {
            res.status(400)
            throw new Error("'Id' deve ser string")
        }

        const [ existingVideo ] = await db("videos").where({ id: idToRemove })

        if (existingVideo) {
            await db("videos")
            .del()
            .where({id: idToRemove})

    await db("videos").del().where({ id: idToRemove })
    res.status(200).send({message: `Usuário removido com sucesso!`})

    }else{
        res.status(404)
        throw new Error("'Id' não existe, não foi possível removê-la")
    }
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