const fetchAllCareersWithoutPaginationApi = async () => {
  try {
    const response = await fetch(`/api/v1/careers?nopagination=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch careers');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}

export default fetchAllCareersWithoutPaginationApi;