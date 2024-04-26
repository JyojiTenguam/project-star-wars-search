const fetchPlanets = async () => {
  try {
    const response = await fetch('https://starwars-api-backup.vercel.app/planets');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching planets');
  }
};

export default fetchPlanets;
