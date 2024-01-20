import styles from '../styles/root.module.css'
import userLocID from '@/components/userLocID';
import { useEffect, useState } from 'react'
import createCal from '@/components/createcal';
import Dropdown from '@/components/InputDrop';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  
  

  const [title, settitle] = useState()
  const [description, setdescription] = useState()
  const [month, setmonth] = useState(undefined)
  const [monthName, setmonthName] = useState(undefined)
  const [canCreate, setcanCreate] = useState()
  const [loading, setloading] = useState(false)

  const [buttontext, setbuttontext] = useState('Create')
  const [linkCreated, setlinkCreated] = useState(false)
  const [link, setlink] = useState()

  const months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
];

  

  useEffect(() => {
    if(title?.length > 1 && description?.length >= 1 && month != undefined) {
      setcanCreate(true)
    }else {
      setcanCreate(false)
    }
  }, [title, description, month])

  async function Button(){
    if(loading === false){
    if(linkCreated){
      window.location.href = `${process.env.NEXT_PUBLIC_URL}/cal/${link}`;


    }else {
      setloading(true)
      setbuttontext("Loading...")
      setlinkCreated(true)
      let link = uuidv4()
      setlink(link)
      let myId = userLocID()
      let x = await createCal({linkID: link, month: month, auth: myId, title: title, des: description, monthName: monthName})
      if(x === 1) {setloading(false); setbuttontext('Open Link')}
    }
  }
  }


  return (
    <div className={styles.homeroot}>
      <h2>Welcome to GroupMeet</h2>
      <p style={{marginTop: '5px'}}>Schedule events for large groups</p>
      <input style={{marginTop: '15px'}} value={title} onChange={(x) => {if(!linkCreated)settitle(x.target.value)}} placeholder='Event Name'/>
      <input placeholder='Event Description' value={description} onChange={(x) => {if(!linkCreated)setdescription(x.target.value)}} />
      <Dropdown placeholder={"Month"} allowCustomInput={false} InputChangeFunction={(x) => {setmonth(x?.value) ; setmonthName(x?.name)}} Suggestions={months}/>

      <button onClick={() => Button()} style={canCreate ? {marginTop: '15px'} : {display: 'none'}} >{buttontext}</button>
    </div>
  )
}
