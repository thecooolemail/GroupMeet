import { useEffect } from 'react';
import userLocID from './userLocID';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const toggleavailability = async ({day, calID}) => {

    let locID = userLocID()
    let name = localStorage.getItem(calID)
    console.log("day:", day, "calID:", calID,"MyId:", userLocID(), "ThisCalName:", localStorage.getItem(calID))
    

    let { data: availability, error } = await supabase.from('availability').select("*")
    .eq('linkid', calID)
    .eq('userid', locID)
    .eq('day', day)
        
    if(availability.length === 0){
        console.log("Adding")
        add()
    }else{
        console.log("Removing")
        remove()
    }

    async function add(){
        const {data: addedData, error: addedError} = await supabase.from('availability')
        .insert([{
            linkid: calID,
            userid: locID,
            name: name,
            day: day,
        }])
        .select()
        console.log("AddedRes", addedData,addedError)
    }

    async function remove(){
        const { error: removeerror } = await supabase.from('availability') .delete()
        .eq('linkid', calID)
        .eq('userid', locID)
        .eq('day', day)
        
    }

}

export default toggleavailability