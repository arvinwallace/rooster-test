import React,{useState} from 'react';


export const useDogFilter = ({setPics, fullPicSet}) => {

  const [dogString, setDogString] = useState()
  const filterDogs = string => {
    if(!string){
      setPics(fullPicSet)
      return
    }
    const filtered = fullPicSet.filter(dog => {
      return dog.name.includes(string.toLowerCase())
    })
    setPics(filtered)
  }
  
  const handleSearchInput = e => {
    e.preventDefault()
    const string = e.target.value;
    setDogString(string)
    filterDogs(string)
  }

  return [dogString,handleSearchInput]

}


