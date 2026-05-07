import axios from "@/lib/api"

export const fetchTechniques = async () => {
  try {
    const response = await axios.get('/api/technique')
    return response.data
  } catch (error) {
    console.error('Error fetching techniques:', error)
    throw error
  }
}

export const createTechnique = async (data: {
  name: string;
  description: string|null;
  category_id: number;
  linked_technique: number|null;
}) => {
  try {
    const response = await axios.post('/api/technique', data);
    return response.data;
  } catch (error) {
    console.error('Error creating technique:', error);
    throw error;
  }
};

export const editTechnique = async (data: {
  id: number,
  name: string;
  description?: string;
  category_id: number;
  linked_technique?: number|null;
}) => {
  try {
    const response = await axios.patch(`/api/technique/${data.id}`, {name: data.name, description: data.description, category_id: data.category_id, linked_technique: data.linked_technique});
    return response.data;
  } catch (error) {
    console.error('Error creating technique:', error);
    throw error;
  }
};

export const deleteTechnique = async (id: number) => {
  try {
    const response = await axios.delete(`/api/technique/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting technique:', error);
    throw error;
  }
};