import {instance} from "./instance";


const ENDPOINT = "/file";

export const fileAPI = {
    getFile () {
        return instance.get(ENDPOINT)
    },
    postFile (photoFile: {myFile: File}) {
       return instance.post(ENDPOINT, photoFile)
    }
}
