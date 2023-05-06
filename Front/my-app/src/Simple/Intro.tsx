import React from 'react'
import './simpleStyles.css';

const Intro = () => {
  return (
    <div style={{display: "flex"}}>

        <header className="IntroBackground">
        <h1><b>Our Story</b></h1>
        <div style={{textAlign: 'center'}}>Yafo's supermarket was born out of a vision to provide you a simple yet exquisite shopping experience 
        that will make you go bankrupt.<br/>
        It all started with the idea to bring together in one place, all the basic food needs
        and the daily necessities, at the cost of your mom's rent and your grandmother's pension.<br/>
        Yafo's supermarket is your place to enjoy high quality products
        with prices you probably cannot afford, because you are poor.
        </div>
        
        <p><img src={require('../assets/yafo.jpg')} alt='placeholder.png' height={'400px'} width={'1000px'}></img></p>
        </header>
       
    </div>
  )
}

export default Intro