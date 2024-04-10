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
                <a > ABOUT </a> 
                <a > WORKS</a>
                <a > CONTACT</a>
                <div className='container-theme'> <span class="material-symbols-outlined">dark_mode</span></div>
            </div>
            </header>
            <div className='container-top'>
                <div className='container-titles'>
                    <div className='container-title'>ERIC CHECUZ </div>
                    <div className='container-subtitles'>
                    <div className='container-subtitle1'>Front-End</div>
                        <div className='container-subtitle2'>Developer</div>
                        </div>
                </div>

                <div className='container-img-top'> <img className='img-top'></img> </div>
            </div>
            </div>
    )
 }

export default HomePage;
