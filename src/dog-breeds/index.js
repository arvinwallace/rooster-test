import React,{useEffect,useState} from 'react';
import {flatDawgs} from './helpers/flatten-dogs';

function DogBreeds(){

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
      .then(data => setPics(data))
    })
    .catch(e => console.log('errorss',e))
  },[])

  const filterDogs = string => {
    console.log("strang", string)
  }

  if(!pics.length){
    return (
      <h1>Here come the breeds</h1>
    )
  }
  return (
          <>
          <div style={{margin:"0px auto"}}>Search</div>
    <div style={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
      {pics.map(dog => {
        return (
          <div>
            <p style={{alignSelf:"center", width:"80%",margin:"25px auto 0px auto",padding:"7px 0px", borderTop:"1px solid black"}}>{dog.name}</p>
            <img style={{height:"300px", width:"300px", objectFit:"cover", border:"10px solid black"}} src={dog.pic} alt={dog.name}/>
          </div>
        )
      })}
    </div>
          </>
  )
}

export default DogBreeds;