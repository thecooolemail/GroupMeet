import { useEffect, useState } from "react"
import styles from '../styles/root.module.css'

const Day = ({data, userdetails, toggleDate}) => {

    const [color, setcolor] = useState("transparent")
    const [Inop, setInop] = useState("0.3")
    const [InCol, setInCol] = useState("transparent")

    

    useEffect(() => {
        if(data.peoplefree.includes(userdetails.name)) {setcolor("white"); setInop("1"); setInCol("var(--accentcolor)")} else {setcolor("transparent") ; setInop("0.4"); setInCol("transparent")}
    }, [userdetails])

    return(
    <div onClick={() =>toggleDate(data)} className={styles.dayBox} style={{ cursor: 'pointer',  width: '100%', height: '100%', display: 'flex', justifyContent:'center', alignItems:'center', gridColumn: data.dayoftheweek, gridRow: data.weekofthemonth+1}}>
        <div className={styles.dayInner} style={{backgroundColor: color}}>
            <p>{data.day}</p>   
            <div className={styles.names}>
            {data.peoplefree.map(x => { return(<small style={{backgroundColor: InCol, opacity: Inop, padding: '5px 10px', borderRadius: 'var(--borderradius)'}}>{x}</small>)})}
            </div>
        </div>
    </div>
    )
}

export default Day