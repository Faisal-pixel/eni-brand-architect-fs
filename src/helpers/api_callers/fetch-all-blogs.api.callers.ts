const fetchAllBlogsApi = async (page: number, limit: number = 6) => {
  try {
    const response = await fetch(`/api/v1/blogPosts?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export default fetchAllBlogsApi;