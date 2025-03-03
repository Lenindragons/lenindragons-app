export const getDatabase = () => {
  const db = localStorage.getItem('pokeapi')
  if (db) {
    return JSON.parse(db)
  }
  return null
}

export const setDatabase = (data: any) => {
  localStorage.setItem('pokeapi', `${JSON.stringify(data)}`)
}