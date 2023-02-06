import { BaseDatabase } from "./BaseDatabase";
import { TVideoDB, TVideoDBPost} from "../models/types";

//---------classe filha-----------classe pai
export class VideoDatabase extends BaseDatabase{
    public static TABLE_VIDEOS = "videos"
    public async findVideos(q: string|undefined){
        let videosDB
        if (q){
            const result: TVideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .where("title", "LIKE", `%${q}%`)
            videosDB = result
        }else{
            const result: TVideoDB[] = await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            videosDB = result
        }
            return videosDB
    }
    public async findVideosById(id: string){
        const [videosDB]: TVideoDB[] | undefined[] = await BaseDatabase
        .connection(VideoDatabase.TABLE_VIDEOS)
        .where({id})
        console.table(videosDB)
        return videosDB
    }
    public async insertVideo(newVideoDB: TVideoDBPost){
        await BaseDatabase
        .connection(VideoDatabase.TABLE_VIDEOS)
        .insert(newVideoDB)
    }
    
    public async updateVideoById(id: string, updatedVideo: TVideoDB) {
        await BaseDatabase
            .connection(VideoDatabase.TABLE_VIDEOS)
            .update(updatedVideo)
            .where({ id })
    }

    public async removeVideoById(id: string){
        await BaseDatabase
        .connection(VideoDatabase.TABLE_VIDEOS)
        .del()
        .where({ id })
    }
}

