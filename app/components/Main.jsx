"use client"
import React, { useState } from 'react'
import { RiCloudLine, RiSearchLine, RiCalendarLine, RiMapPin2Line, RiWindyLine } from '@remixicon/react'
import axios from 'axios'
import { motion } from 'framer-motion'

const Main = () => {

  const [isLoading, setisLoading] = useState('none')
  const [userLocation, setUserLocation] = useState(null)
  const apikey = '345db7ac63f60f10297a301d0a908bb1'
  const [City, setCity] = useState("")
  const [cardcity, setCardcity] = useState('')
  const [temp, setTemp] = useState(null)
  const [tempdes, setTempdesc] = useState(null)
  const [carddate, setDate] = useState("")
  const [fiveday, setFiveday] = useState([]);
  const [feels, setFeels] = useState("");
  const [wind, setWind] = useState("");


  const search = async () => {
    try {
      setisLoading(i => 'loading')
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}`)
      console.log(response.data);
      const lat = response.data.coord.lat
      const lon = response.data.coord.lon
      console.log(lat, lon);
      const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${apikey}`)
      const originalarr = response2.data.list
      const unqarr = originalarr.filter((val, i, arr) => {
        return (
          val.dt_txt.split(" ")[1] == "09:00:00"
        )
      })
      console.log(response2.data.list);
      const date = new Date();
      setDate(`${date}`)
      setCardcity(response.data.name);
      setFeels(Math.round(response.data.main.feels_like - 273))
      setTemp(Math.round(response.data.main.temp - 273));
      setTempdesc(response.data.weather[0].description)
      setFiveday(unqarr);
      setWind(response.data.wind.speed)
      setisLoading(i => 'loaded')
    }
    catch (e) {
      setisLoading(i => 'none')
      console.log(e);
      setDate(``)
      setCardcity('');
      setTemp(null);
      setTempdesc('')
    }
  }


  return (
    <div>
      <div className='flex px-[5vw] py-[4vh] w-full justify-between flex-wrap gap-4 items-center'>
        <div className='flex gap-2 justify-start items-center'>
          <RiCloudLine size="24px" fill='#fff' />
          <h1 className='text-2xl text-[#fff] font-semibold tracking-tighter'>Weather App</h1>
        </div>
        <form onSubmit={(e) => {e.preventDefault(); search()}}>
          <div className='relative w-full md:w-[30vw] bg-zinc-800 px-6 rounded-full flex justify-between items-center '>
            <input
              type="text"
              value={City}
              onChange={(e) => { setCity(e.target.value) }}
              placeholder="Search City By Name"
              className=" text-white  w-full bg-transparent placeholder-zinc-500 py-3 pr-10  outline-none"
            />
            <RiSearchLine onClick={()=> search()} type='submit' className=" cursor-pointer text-[#dcdcdc]" size="24px" />
          </div>
        </form>
      </div>


      <div className='px-[4vw]'>
        {
          isLoading == 'loading' ? <div className='w-full bg-[#101010] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between items-start'>
            <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[6px] rounded-full w-1/2 tracking-tighter text-6xl font-semibold '>
              <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-full'></motion.div>
            </div>
            <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[12px] rounded-lg w-1/2 tracking-tighter text-6xl font-semibold '>
              <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-lg'></motion.div>
            </div>
            <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[6px] rounded-full w-full tracking-tighter text-6xl font-semibold '>
              <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-full'></motion.div>
            </div>
            <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[6px] rounded-full w-full tracking-tighter text-6xl font-semibold '>
              <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-full'></motion.div>
            </div>
          </div> : isLoading == 'loaded' ?
            <div className='w-full bg-[#101010] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between items-start'>
              <h1 className='text-[#cccccc] tracking-tighter font-medium '>Now</h1>
              <div className='flex items-start gap-2'>
                <h1 className='text-[#dcdcdc] tracking-tighter text-6xl font-semibold '>{temp}</h1>
                <h1 className='text-[#dcdcdc] tracking-tighter text-4xl font-semibold '> °C</h1>
              </div>
              <p className='text-[#a09e9e] text-[14px] '>feels like {feels} °C</p>
              <h1 className='text-[#cccccc] tracking-tighter '>{tempdes}</h1>
              <div className='flex pr-12 gap-2 pt-4 items-center'>
                <RiWindyLine size='18px' color='#cccccc' />
                <p className='text-[#a09e9e] text-[14px] '>Wind Speed : {wind} M/S</p>
              </div>
              <div className='border-b-[#555] border-b w-full py-1'></div>
              <div className='flex pr-12 gap-2 pt-4 items-center'>
                <RiCalendarLine size='18px' color='#cccccc' />
                <p className='text-[#a09e9e] text-[14px] '>{carddate}</p>
              </div>
              <div className='flex pr-12 gap-2 pt-2 items-center'>
                <RiMapPin2Line size='18px' color='#cccccc' />
                <p className='text-[#a09e9e] text-[14px] '>{cardcity}</p>
              </div>
            </div> :
            <h1 className='text-zinc-600 mt-8'>Nothing To Show</h1>

        }
      </div>
      <div className='pt-[5vh] px-[5vw]'>
        {
          isLoading == "loaded" ?
            <h1 className='text-2xl  font-semibold text-zinc-200'>5 Day Forecast</h1>
            : isLoading == "loading" ?
              <div className='text-[#dcdcdc]  relative overflow-hidden bg-zinc-900 py-[6px] rounded-full w-1/2 tracking-tighter text-6xl font-semibold '>
                <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-full'></motion.div>
              </div>
              : <></>
        }

      </div>
      <div className='flex gap-6   px-[5vw] py-[5vh] flex-wrap'>
        {
          fiveday.map((item, i) => {

            return (
              isLoading == "loaded" ?
                <div key={i} className='w-fit bg-[#101010] border border-zinc-800 rounded-xl py-6 pl-6 pr-16 flex flex-col justify-between items-start'>
                  <h1 className='text-[#cccccc] tracking-tighter font-medium py-1 '>{item.dt_txt}</h1>
                  <div className='flex items-start gap-2'>
                    <h1 className='text-[#dcdcdc] tracking-tighter text-6xl font-semibold '>{Math.round(item.main.temp - 273)} </h1>
                    <h1 className='text-[#dcdcdc] tracking-tighter text-4xl font-semibold '> °C</h1>
                  </div>
                  <p className='text-[#a09e9e] text-[14px] '>feels like {Math.round(item.main.feels_like - 273)} °C</p>
                  <h1 className='text-[#cccccc] tracking-tighter '>{item.weather[0].description}</h1>
                  <div className='flex pr-12 gap-2 pt-4 items-center'>
                    <RiWindyLine size='18px' color='#cccccc' />
                    <p className='text-[#a09e9e] text-[14px] '>Wind Speed : {item.wind.speed} M/S</p>
                  </div>


                </div>
                : isLoading == "loading" ?
                  <div className='w-[320px] bg-[#101010] border border-zinc-800 rounded-xl p-6 flex flex-col justify-between items-start'>
                    <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[6px] rounded-full w-1/2 tracking-tighter text-6xl font-semibold '>
                      <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-full'></motion.div>
                    </div>
                    <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[12px] rounded-lg w-1/2 tracking-tighter text-6xl font-semibold '>
                      <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-lg'></motion.div>
                    </div>
                    <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[6px] rounded-full w-full tracking-tighter text-6xl font-semibold '>
                      <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-full'></motion.div>
                    </div>
                    <div className='text-[#dcdcdc] my-1 relative overflow-hidden bg-zinc-900 py-[6px] rounded-full w-full tracking-tighter text-6xl font-semibold '>
                      <motion.div initial={{ left: '0%', width: '10%' }} animate={{ left: '100%', width: '100%' }} transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }} className='absolute  bg-zinc-700 w-1/4 top-0 left-0 h-full  rounded-full'></motion.div>
                    </div>
                  </div> :
                  <></>
            )
          })
        }
      </div>
    </div>
  )
}

export default Main