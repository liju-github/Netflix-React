import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import herobanner from  '../../assets/hero_banner.jpg'
import herotitleimg from  '../../assets/hero_title.png'
import playicon from '../../assets/play_icon.png'
import infoicon from '../../assets/info_icon.png'
import Titlecards from '../../components/Titlecards/Titlecards'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={herobanner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={herotitleimg} alt="" className='caption-img'/>
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns">
          <Link to={`/player/365177`}>
           
            <button className='btn'>
              <img src={playicon} alt="" />Play
            </button>
            </Link>
            <button className='btn dark-btn'>
              <img src={infoicon} alt="" />More Info
            </button>
          </div>
        </div>
      </div>
      <Titlecards/>
      <div className="more-cards">
      <Titlecards title="BlockBuster Movies" category = {"top_rated"}/>
      {/* <Titlecards title="Only on Netflix" category = {"popular"}/> */}
      <Titlecards title="Upcoming" category = {"upcoming"}/>
      <Titlecards title="Top Pics for You" category = {"now_playing"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
