const deleteCareersApi = async (careerId: string) => {
  try {
    const response = await fetch(`/api/v1/careers/${careerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete blog post');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

export default deleteCareersApi;