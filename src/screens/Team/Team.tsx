import React from 'react';
import './team.css';
import logo from '../../images/alexboagreek.jpg';
import frame from "../../images/units.jpg";
import github from '../../images/github.png';


const TeamUnits = () => {

    return (
        <div className='card-wrapper'>
            <h1 className='team-units-title'>Our RS-Lang Team</h1>
            <div className='team-units'>
            
                <div className="card-unit">
                    <img className="unit-logo" src={frame} alt="" />
                    <h1 className='card-unit-title'>Julia</h1>
                    <div className='unit-box'>
                        <p className='unit-description'>
                            Julia is the team-leader 
                        </p>
                        <div className='github-box'>
                            <img className='github-logo' src={ github } alt="github" />
                            <a className='github-link' href='https://github.com/alexboagreek/' target='_blank' rel="noreferrer">Link to github</a>
                        </div>
                    </div>
                </div>
                <div className="card-unit">
                    <img className="unit-logo" src={frame} alt="" />
                    <h1 className='card-unit-title'>Nadya</h1>
                    <div className='unit-box'>
                        <p className='unit-description'>
                            Nadya is the best game-developer
                        </p>
                        <div className='github-box'>
                            <img className='github-logo' src={ github } alt="github" />
                            <a className='github-link' href='https://github.com/alexboagreek/' target='_blank' rel="noreferrer">Link to github</a>
                        </div> 
                    </div>
                </div>
                <div className="card-unit">
                    <img className="unit-logo" src={ logo } alt="team-unit" />
                    <h1 className='card-unit-title'>Aleksandr</h1>
                    <div className='unit-box'>
                        <p className='unit-description'>
                            Aleksandr is working in greek shop
                        </p>
                        <div className='github-box'>
                            <img className='github-logo' src={ github } alt="github" />
                            <a className='github-link' href='https://github.com/alexboagreek/' target='_blank' rel="noreferrer">Link to github</a>
                        </div>
                    </div>
                  

                </div>

            </div>

        </div>
      
    )


}

export default TeamUnits;


