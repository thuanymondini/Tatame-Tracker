import axios from "axios"

export const fetchTechniqueCategories = async () => {
  try {
    const response = await axios.get('/api/techniqueCategory')
    return response.data
  } catch (error) {
    console.error('Error fetching techniques:', error)
    throw error
  }
}

export const createTechniqueCategory = async (data: {
  name: string;
  description?: string;
}) => {
  try {
    const response = await axios.post('/api/techniqueCategory', data);
    return response.data;
  } catch (error) {
    console.error('Error creating technique category:', error);
    throw error;
  }
};

export const editTechniqueCategory = async (data: {
  id: number,
  name: string;
  description?: string;
}) => {
  try {
    const response = await axios.patch(`/api/techniqueCategory/${data.id}`, {name: data.name, description: data.description});
    return response.data;
  } catch (error) {
    console.error('Error creating technique category:', error);
    throw error;
  }
};

export const deleteTechniqueCategory = async (id: number) => {
  try {
    const response = await axios.delete(`/api/techniqueCategory/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting technique category:', error);
    throw error;
  }
};