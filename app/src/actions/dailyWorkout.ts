import axios from "@/lib/api"

export const fetchDailyWorkouts = async () => {
  try {
    const response = await axios.get('/api/dailyWorkouts')
    return response.data
  } catch (error) {
    console.error('Error fetching dailyWorkouts:', error)
    throw error
  }
}

export const createDailyWorkout = async (data: {
  training_date: string;
  observations?: string | null;
  techniques: number[];
}) => {
  try {
    const response = await axios.post('/api/dailyWorkouts', data);
    return response.data;
  } catch (error) {
    console.error('Error creating dailyWorkout:', error);
    throw error;
  }
};

export const editDailyWorkout = async (data: {
  id: number,
  training_date: string;
  observations?: string | null;
  techniques: number[];
}) => {
  try {
    const response = await axios.patch(`/api/dailyWorkouts/${data.id}`, {training_date: data.training_date, observations: data.observations, techniques: data.techniques});
    return response.data;
  } catch (error) {
    console.error('Error creating dailyWorkout:', error);
    throw error;
  }
};

export const deleteDailyWorkout = async (id: number) => {
  try {
    const response = await axios.delete(`/api/dailyWorkouts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting dailyWorkout:', error);
    throw error;
  }
};