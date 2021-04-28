import React,{useEffect,useState} from 'react';
import {flatDawgs} from './helpers/flatten-dogs';
import {useDogFilter} from './helpers/dogFilter';
import ProjectInfo from './info';
import './breeds.css';
import SadDawg from './sadPuppy.png'

function DogBreeds(){
  const [fullPicSet, setFullPicSet] = useState([])
  const [pics,setPics] = useState([])
  
  
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(d => flatDawgs(d.message))
    .then(dawgs => {
          Promise.all(dawgs.map(d => {
          return fetch(`https://dog.ceo/api/breed/${d}/images/random`)
          .then(res => res.json())
          .then(res => res.message)
          .then(message => {
            return {name:d, pic:message}
          })
      }))
      .then(data => {
        setPics(data)
        setFullPicSet(data)
      })
    })
    .catch(e => console.log('errorss',e))
  },[])

  /*  custom hook for dog search  */
  const [dogString,handleSearchInput] = useDogFilter({setPics, fullPicSet})

  ///////////////////////////////////////////////////////////
  ////////////////////// RENDER /////////////////////////////
  //////////////////////////////////////////////////////////
 
  if(!fullPicSet.length){
    return (
      <h1>Here come the breeds</h1>
    )
  }
  return (
    <>
      <ProjectInfo/>
      <div style={{margin:"0px auto", display:"flex", flexDirection:"column"}}>
        <h2 style={{marginBottom:"10px"}}>Search Dogs</h2>
        <input autoFocus className="breed-input" type="text" value={dogString} onChange={handleSearchInput}></input>
      </div>
      <div className="breed-result-container">
        {!pics.length? 
          <div className="breed-result">
              <p className="breed-title">No dogs match</p>
              <img className="breed-image" src={SadDawg} alt="sad dog"/>
          </div>
          : 
          pics.map(dog => {
            return (
              <div className="breed-result">
                <p className="breed-title">{dog.name}</p>
                <img className="breed-image" src={dog.pic} alt={dog.name}/>
              </div>
            )
        })
        }
      </div>
    </>
  )
}

export default DogBreeds;