import axios from 'axios';

export const getFoods = async () => {
  try {
    const res = await axios.get('https://api.example.com/foods');
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};