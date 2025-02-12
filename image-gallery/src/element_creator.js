export const elCreator = (el, elementClass, attribute, alt) => {
    let result 
    if (!attribute && !alt) {
      result = document.createElement(el)
      result.classList.add(elementClass)
    }else {
        result = document.createElement(el)
        result.classList.add(elementClass)
        result.src = attribute
        result.alt = alt
    }
   // console.log(result)
    return result
}
