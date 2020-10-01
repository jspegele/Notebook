export const setLastNote = id => {
  localStorage.setItem('lastNote', JSON.stringify(id))
}

export const getLastNote = () => {
  const localData = localStorage.getItem('lastNote')
  return localData ? JSON.parse(localData) : null
}
