const alphaSet = new Set(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])


function compareSets(setA, setB) {
  let difference = new Set(setA)
  for (let elem of setB) {
      difference.delete(elem)
  }
  return difference
}

function pangram(string){
  const reg = /^[a-zA-Z]+$/

  const stringSet = new Set(string.toLowerCase().split('').filter(x => reg.test(x)))
  const result = compareSets(alphaSet, stringSet)
  return result.size? [...result].sort().join("") : "PANGRAM"
}

function checkpangram(){
  const value = document.getElementById("pangram").value
  console.log("Result", pangram(value))
  const result = pangram(value)
  const showResult = document.getElementById("results")
  showResult.innerText = `${result}`
}
