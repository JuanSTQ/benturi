import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../assets/styles/components/Player.scss"
const Player = (props) => {
  const [src, setSrc] = useState("")
  useEffect(() => {
    axios({
      url: `/movie/${window.location.pathname.split("/")[2]}`,
      method:"get",
      params: {id:window.location.pathname.split("/")[2]},
    }).then(({data})=>{
      setSrc(data.source)
      console.log(data.source)
    }).catch(err=>{
      console.log(err)
    })
  }, [])
  return (
    <>
    {
      src ? 
          <div className="video__container">
            <div className="video__navegation">
              <a href="/"> ← Regresar al Home</a>
            </div>
            <video controls>
              <source src={src} type="video/mp4"></source>
            </video>
          </div>
      :
      <section className="loading">
        <div className="ripple-loader">
          <div></div>
          <div></div>
        </div>
      </section>
    }
    </>
  )
}

export default Player
