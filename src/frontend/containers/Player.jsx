import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadMovies } from '../actions'
import "../assets/styles/components/Player.scss"

const Player = ({loadMovies}) => {
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
  const onHandleClick = ()=>{
    loadMovies({})
  }
  return (
    <>
    {
      src ? 
          <div className="video__container">
            <div className="video__navegation">
              <Link onClick={onHandleClick} to="/"> ← Regresar al Home</Link>
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

export default connect(null, {loadMovies})(Player)
