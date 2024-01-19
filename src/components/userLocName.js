import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import Dropdown from './InputDrop';

const UserLockName = ({calName, retName, calLinkID}) => {

    const [name, setname] = useState()
    const [hasName, sethasName] = useState()
    const [canEnter, setcanEnter] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let Name = localStorage.getItem(calLinkID)
            console.log("Name", name, calLinkID)
            if(Name){ sethasName(true); retName(Name) }else{ sethasName(false) }
        }
    }, [calLinkID])

    useEffect(() => {
        if(name?.length >= 2){
            setcanEnter(true)
        }else {setcanEnter(false)}
    }, [name])

    function Button(){
        localStorage.setItem(calLinkID, name)
        retName(name)
        sethasName(true)
    }

    return(
    <div style={hasName ? {display: 'none'} : {zIndex: 10, backgroundColor: 'var(--backgroundCol)',position: 'fixed', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <h2 style={{marginBottom: '10px'}}>{calName}</h2>
        <Dropdown allowCustomInput={true} placeholder={"Name"} InputChangeFunction={(x) => setname(x)}/>
        <small style={{inlineSize: '200px', textAlign: 'center', marginTop: '10px'}}>Info will be saved on this browser. Clearing cookies will result in data loss</small>
        <button onClick={() => Button()} style={canEnter ? {marginTop: '10px'} : {display: 'none'}} >Confirm</button>
    </div>
    )

}

export default UserLockName