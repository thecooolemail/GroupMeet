import { useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

const userLocID = () => {

    if (typeof window !== 'undefined') {

        let ID = localStorage.getItem("UUID")
        console.log(ID)
        if(ID){
            return localStorage.getItem("UUID")
        }else{
            localStorage.setItem("UUID", uuidv4())
            return localStorage.getItem("UUID")
        }

    }



}

export default userLocID