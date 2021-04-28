import React,{useEffect,useState} from 'react';
import {flatDawgs} from './helpers/flatten-dogs';
import SadDawg from './sadPuppy.png'

function DogBreeds(){
  const [fullPicSet, setFullPicSet] = useState([])
  const [pics,setPics] = useState([])
  const [dogString, setDogString] = useState()

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

  const filterDogs = string => {
    if(!string){
      setPics(fullPicSet)
      return
    }
    const filtered = fullPicSet.filter(dog => {
      return dog.name.includes(string)
    })
    if(!filtered.length){
      setPics([
        {
          name: "No Dog Found",
          pic: SadDawg
        }
      ])
    }
    setPics(filtered)
  }

  const handleSearchInput = e => {
    e.preventDefault()
    const string = e.target.value;
    setDogString(string)
    filterDogs(string)
  }

  if(!fullPicSet.length){
    return (
      <h1>Here come the breeds</h1>
    )
  }
  return (
    <>
      <div style={{margin:"0px auto"}}>
        <h2>Search Dogs</h2>
        <input type="text" value={dogString} onChange={handleSearchInput}></input>
      </div>
      <div style={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
        {pics.map(dog => {
          return (
            <div style={{margin:"0px 2px"}}>
              <p style={{alignSelf:"center", width:"80%",margin:"25px auto 0px auto",padding:"8px 0px", borderTop:"1px solid black"}}>{dog.name}</p>
              <img style={{height:"300px", width:"300px", objectFit:"cover", border:"10px solid black"}} src={dog.pic} alt={dog.name}/>
            </div>
          )
        })}
        {!pics.length? 
          <div style={{margin:"0px 2px"}}>
              <p style={{alignSelf:"center", width:"80%",margin:"25px auto 0px auto",padding:"8px 0px", borderTop:"1px solid black"}}>No dogs match</p>
              <img style={{height:"300px", width:"300px", objectFit:"cover", border:"10px solid black"}} src={SadDawg} alt="sad dog"/>
          </div>
          : null
        }
      </div>
    </>
  )
}

export default DogBreeds;