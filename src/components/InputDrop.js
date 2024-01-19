import { useState, useRef, useEffect } from "react"

const Dropdown = ({allowCustomInput, Suggestions, InputChangeFunction, placeholder}) => {        
    
    const RootRef = useRef(null);
    const [input, setinput] = useState(undefined)
    const [DropDownDisplay, setDropDownDisplay] = useState("none")
    const [activesuggestions, setactivesuggestions] = useState([])

    const handleClickOutside = (event) => { if (RootRef.current && !RootRef.current.contains(event.target)) {  setDropDownDisplay("none")  }};

    useEffect(() => {
        setactivesuggestions(Suggestions)
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, []);

    useEffect(() =>{
        if(allowCustomInput === undefined || allowCustomInput === false){
            if(Suggestions != undefined && Suggestions.some(x => x.name?.toLowerCase() === input?.toLowerCase()) && InputChangeFunction) {
                InputChangeFunction(Suggestions.find(x => x.name?.toLowerCase() === input?.toLowerCase()))}
            }
            else if (InputChangeFunction){
                InputChangeFunction(input)
            } 
    }, [input])

    return(
        <div ref={RootRef} style={DropDownDisplay ? {margin: '5px',  minHeight: '30px', display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'center' ,borderRadius: 'var(--borderradius)', border: 'var(--border)'} : {margin: '5px', minHeight: '40px', display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'center' ,borderRadius: 'var(--borderradius)', border: 'var(--borderacc)'}}>
            <div style={{width: '100%',height: '40px', display: 'flex', flexDirection: 'row', backgroundColor: 'transparent'}}>
                <input type="text" onClick={() => {setDropDownDisplay("flex"); setactivesuggestions(Suggestions)}} onBlur={() => {if (!Suggestions?.some(x => x.name?.toLowerCase() === input?.toLowerCase()) && allowCustomInput === false) {setinput("")}}}  style={{width: '100%', height: '40px',  margin: '0px', outline: 'none', border: 'none'}} autoComplete="off" value={input}  name="text" placeholder={placeholder}  onChange={(x) => { setinput(x.target.value) ; if(x.target.value.length != 0 ) {setactivesuggestions(x.target.value ? activesuggestions?.filter(item => item?.name?.toLowerCase().startsWith(x.target.value?.toLowerCase())) : [])}else {setactivesuggestions(Suggestions)} }}/>
                </div>
                  {activesuggestions?.length > 0 && (
                    <ul style={{display: DropDownDisplay , width: '100%', overflowY: 'scroll' , maxHeight: '113px', fontSize: '14px', flexDirection: 'column'}}>
                      {activesuggestions?.map((x, index) => (
                        <li key={index}  onClick={() => {setinput(x.name); setDropDownDisplay("none")}}> {x.name} </li>
                        ))}
                    </ul>
                      )}
                      </div>
    )
}

export default Dropdown;