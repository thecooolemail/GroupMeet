import Image from 'next/image'
import Day from '@/components/day'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import userLocID from '@/components/userLocID'
import UserLockName from '@/components/userLocName'
import toggleavailability from '@/components/toggleavailability'

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Cal() {

  const router = useRouter()

  const [name, setname] = useState()
  const [calId, setcalId] = useState()
  const [data, setdata] = useState([]);
  const [copied, setcopied] = useState("Copy Link")
  const [availabilityData, setavailabilityData] = useState([]);
  let userdetails = {name: name}

  useEffect(() => { setcalId(router.query.id); userLocID() }, [router])
  useEffect(() => { if(calId != undefined) getData() }, [calId])

  async function getData() {
    const { data, error } = await supabase.from("calendars").select('*')
      .eq('linkid', calId)
    setdata(data[0])
  }

  async function getAvailability() {
    const { data: dataAvalib, error } = await supabase.from("availability").select('*')
      .eq('linkid', calId)
    createdata(dataAvalib)
  }
  
  
  useEffect(() => {
    if(data){
      getAvailability()
    }
  }, [data])

 
  function createdata(x){
    console.log("Avalibility Data:", x)
    let temparray = []
    let weekofthemonth = 1
    let daysInTheMonth = new Date(2024, data.month, 0).getDate()

    for(let i = 0 ; i < daysInTheMonth ; i++){
      //Dealing with sunday being 0
      let dofw = new Date(2024, 2, i).getDay()
      if (dofw === 0) {dofw = 7 } 
      if (dofw === 1 )weekofthemonth = weekofthemonth + 1
      
      let peopleFreeThisDay = [];

      // Check each entry in 'x' to see if the day matches 'i + 1'
      for (let j = 0; j < x.length; j++) {
          if (x[j].day === String(i + 1)) {
              peopleFreeThisDay.push(x[j].name);
          }
      }



      temparray.push({day: i+1, dayoftheweek: dofw, weekofthemonth: weekofthemonth, peoplefree: peopleFreeThisDay })
    }
    
    setcaldata(temparray)
  }

  const [caldata, setcaldata] = useState()
  const [topdates, settopdates] = useState()
  const [peopleVoted, setpeopleVoted] = useState()

  let month = 2
  
  
  
  useEffect(() => {
   let x = caldata?.sort((a, b) => b.peoplefree.length - a.peoplefree.length);
    settopdates(x?.slice(0,4))
  let allNames = [...new Set(caldata?.flatMap(x => x.peoplefree))];
  setpeopleVoted(allNames)
  }, [caldata])



function toggleDate(x) {
    //console.log(x)
    toggleavailability({day: x.day, calID: calId})

    const updatedArray = caldata.map(item => {
      if (item.day === x.day) { const isUserFree = item.peoplefree.includes(userdetails.name); return {...item, peoplefree: isUserFree ? item.peoplefree.filter(name => name !== userdetails.name): [...item.peoplefree, userdetails.name]}}
      return item;
    })

    setcaldata(updatedArray);
}

function copyText(entryText){
  setcopied("Copied!")
  navigator.clipboard.writeText(entryText);
}

  

  return (
    <div style={{padding: '10px 10px', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
      <UserLockName retName={(x) => setname(x)} calName={data?.title} calLinkID={calId}/>
      
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <b onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_URL}`}>GroupMeet</b>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button onClick={() => copyText(`${process.env.NEXT_PUBLIC_URL}/cal/${calId}`)} style={{padding: '7px 20px', marginLeft: '5px', marginRight: '5px'}}>{copied}</button>
          <button onClick={() =>   window.location.href = `${process.env.NEXT_PUBLIC_URL}`} style={{padding: '7px 20px', marginLeft: '5px', marginRight: '5px'}}>Create New</button>
        </div>
      </div>
   
      <div style={{width: '90%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <h3 style={{alignSelf: 'flex-start', marginTop: '20px'}}>{data?.title}.</h3>
        <small style={{alignSelf: 'flex-start', marginBottom: '20px'}}> <span style={{fontWeight: '500'}}>{data?.monthname}</span> | {data?.description}.</small>
        <p style={{alignSelf: 'flex-start'}}>Hi  <b>{name}</b>, select all days your free.</p>
        <div style={{display: 'grid', width: '100%', height: '100%', marginTop: '10px', marginBottom: '10px', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(6, 1fr)', backgroundColor: 'var(--accentcolor)', borderRadius: 'var(--borderradius)'}}>
          <b style={{gridColumn: '1', gridRow: '1',  textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Mon</b>
          <b style={{gridColumn: '2', gridRow: '1',  textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Tue</b>
          <b style={{gridColumn: '3', gridRow: '1',  textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Wed</b>
          <b style={{gridColumn: '4', gridRow: '1',  textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Thu</b>
          <b style={{gridColumn: '5', gridRow: '1',  textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Fri</b>
          <b style={{gridColumn: '6', gridRow: '1',  textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Sat</b>
          <b style={{gridColumn: '7', gridRow: '1',  textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Sun</b>
          {caldata?.map((x) => { return (<Day key={x.day} data={x} userdetails={userdetails} toggleDate={toggleDate} />) })}
        </div>

        {/*<p style={{alignSelf: 'flex-start'}}>Top Days</p>*/}
        <div style={{width: '100%', backgroundColor: 'var(--accentcolor)', borderRadius: 'var(--borderradius)', padding: '14px 10px',  minHeight: '60px', display: 'flex',overflowY: 'hidden', flexDirection: 'row', justifyContent: 'flex-start ',gap: '10px',overflowX: 'scroll', alignItems: 'center', marginBottom: '10px'}}>
        {topdates?.map((x) => { 
          return(
            <div key={x.day} style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white',padding: '5px 10px', borderRadius: 'var(--borderradius)'}}>
              <p>Day {x.day}</p>
              <div style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white'}}>              
                <p style={{textWrap: 'nowrap', paddingRight: '10px', whiteSpace: 'nowrap'}}> <b>{x.peoplefree.length}</b> Available</p>
                {/*<p style={{textWrap: 'nowrap', paddingRight: '10px'}}>| {x.peoplefree.map(x => String(x + " , "))}</p>*/}
              </div>
            </div>
        )})}
        </div>
        
        {/* peopleVoted?.map((x) => { return(<p key={x}>{x}</p>) }) */}

      </div>
    </div>
  )
}


