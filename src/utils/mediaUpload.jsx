import { createClient } from "@supabase/supabase-js"

const url = "https://fwzofuhuoisjghczgvrn.supabase.co"
const key = "sb_publishable_Gc_zeMcfuByuIl3dLwY10g_lr48JP1v"

const supabase= createClient(url, key)

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject("No file selected")
            }

            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert : false,
                cacheControl : "3600"
            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
            }).catch(
                ()=>{
                    reject("error occured in supabase connection")
                }
            )
        }
    )
    return mediaUploadPromise
}