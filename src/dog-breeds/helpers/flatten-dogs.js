

export const flatDawgs = dogs => {
  const mapped = Object.keys(dogs).map(d => {
    if(dogs[d].length){
      return dogs[d].map(sub => {
        return `${d}/${sub}`
      })
    } else {
      return d
    }
  }).reduce((acc, val) => acc.concat(val), []);
  return mapped
}