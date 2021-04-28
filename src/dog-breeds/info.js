import React from 'react';
import './breeds.css'

function ProjectInfo(){
  return (
    <div className="breed-author-container">
      <div>
        <span style={{color:"#add6ff"}}>Author: </span>
        <span >Arvin Wallace</span>
      </div>
      <div>
        <span style={{color:"#add6ff"}}>Source: </span>
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          className="breed-author-links" 
          href="https://github.com/arvinwallace/rooster-test">
          github
        </a>
      </div>
    </div>
  )
}

export default ProjectInfo;