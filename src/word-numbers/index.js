

function wordToNum(string){
  
  const numberMap = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  }
  const numRay = string.split(";").map(n => numberMap[n])
  console.log(numRay)
  return numRay.join("")
}



wordToNum("zero;two;five;seven;four;eight")