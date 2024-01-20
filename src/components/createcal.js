import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const createCal = async ({linkID, month, auth, title, des, monthName}) => {

console.log(linkID, month, auth, title, des)



const { data, error } = await supabase.from('calendars')
    .insert([{ 
        linkid: linkID, 
        author: auth,
        month, month,
        title: title,
        description: des,
        monthname: monthName     
    }])
  .select()

  if(data != undefined) {
    return 1
} else{
    return 0
}
          

}

export default createCal