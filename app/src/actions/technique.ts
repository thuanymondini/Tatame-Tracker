import axios from "axios"

export const fetchTechniques = async () => {
  try {
    const response = await axios.get('/api/technique')
    return response.data
  } catch (error) {
    console.error('Error fetching techniques:', error)
    throw error
  }
}