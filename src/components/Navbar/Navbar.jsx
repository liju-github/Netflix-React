import React, { useEffect,useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import searchicon from  '../../assets/search_icon.svg'
import bellicon from '../../assets/bell_icon.svg'
import profileimg from '../../assets/profile_img2.png'
import careticon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase/firebase'

const Navbar = () => {

  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) { 
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }else{
        console.log("classList not defined")
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div className='navbar' ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="" />  
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={searchicon} className='icons' alt="" />
        <p>Children</p>
        <img src={bellicon} className='icons' alt="" />
        <div className="navbar-profile">
          <img src={profileimg} className='profile' alt="" />
          <img src={careticon} alt="" />
          <div className="dropdown">
            <p onClick={logout}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
