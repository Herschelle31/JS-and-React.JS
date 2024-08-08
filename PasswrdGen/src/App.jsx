import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)

  const [password, setPassword] = useState("")

  const passGen = useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyz"

    if(uppercase)str+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numbers)str+="0123456789"
    if(symbols)str+="!@#$%^&*()"

    for(let i=0;i<length;i++)
    {
      pass+=str[Math.floor(Math.random()*str.length)]
    }

    setPassword(pass)
  },[length,uppercase,numbers,symbols, setPassword])

  const passwordRef= useRef(null)
  const copyPass2Clipboard = ()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  
  }



  useEffect(()=>{
    passGen()
  },[length,uppercase,numbers,symbols])


  return (
    <div className='bg-black fixed h-screen w-screen'>
      <div className='bg-gray-700 flex flex-col px-5 py-4 rounded-3xl w-2/5 mx-auto my-52'>
          <div className='text-white text-3xl mt-2 mb-2 mx-auto'>Password Generator   
          </div>
          <div className='flex flex-row w-full h-14 my-3'>
          <input type="text" 
          value={password}
          className='text-black text-2xl h-full bg-slate-50 rounded-bl-2xl rounded-tl-2xl pl-3 mb-2 w-full'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button 
          className='bg-blue-500 h-full w-24 text-white rounded-tr-2xl rounded-br-2xl text-2xl '
          onClick={copyPass2Clipboard}>
            Copy
            </button>
          </div>

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-2'>
              <input type="range"
              min={6}
              max={99}
              value={length}
              className='cursor-pointer w-28' 
              onChange={(e)=>setLength(e.target.value)}
              />
              <label className='text-orange-500 text-lg'>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-2'>
            <input type="checkbox"
            defaultChecked={numbers}
            id='numberInput'
            onChange={()=>setNumbers((prev) => !prev)}
             />
             <label htmlFor="numberInput" className='text-orange-500 text-lg'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <input
              type="checkbox"
              defaultChecked={uppercase}
              id='numberInput'
              onChange={()=>setUppercase((prev) => !prev)}
               />
             <label htmlFor="numberInput" className='text-orange-500 text-lg'>Uppercase</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <input
              type="checkbox"
              defaultChecked={symbols}
              id='numberInput'
              onChange={()=>setSymbols((prev) => !prev)}
               />
             <label htmlFor="numberInput" className='text-orange-500 text-lg'>Symbols</label>
            </div>
          </div>
      </div>
    </div> 
  )
}

export default App
