import React, { useState , useEffect} from 'react';
import { auth } from '../firebase/firebaseConfig';
import './styleHome.css';

function HomePage() {
    return (
        <div className="main-container">
            <header className='header'>
                <div className='logo-title'>
                    <div className='container-logo'></div>
                    <div className='container-title1'>ERIC</div>&nbsp;
                    <div className='container-title2'>DEVICE</div>
                    </div>
                <div className='container-link'>
                <a className='link' > ABOUT </a> 
                <a className='link' > WORKS</a>
                <a className='link'> CONTACT</a>
                <div className='container-theme'> <span class="material-symbols-outlined">dark_mode</span></div>
            </div>
            </header>
            <div className='container-top'>
                <div className='container-titles'>
                    <div className='container-title'>Eric Checuz </div>
                    <div className='container-subtitles'>
                    <div className='container-subtitle1'><h2 className='subtitle3'><span className='subtitle4'>Front-End </span> Developer</h2></div>
                        
                    </div>
                    <div className='container-tag'>
                    <div className='tag'>JavaScript</div>
                    <div className='tag'>TypeScript</div>
                    <div className='tag'>Angular</div>
                    <div className='tag'>React</div>
                    <div className='tag'>Java</div>
                    <div className='tag'>Springboot</div>
                    <div className='tag'>Python</div>
                    <div className='tag'>SQL</div>
                    </div>
                </div>

                <div className='container-img-top'> <img className='img-top'></img> </div>
            </div>
            </div>
    )
 }

export default HomePage;
