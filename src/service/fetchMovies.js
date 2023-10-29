const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzIzZWM2ZTBmOTk4MzA3MDVhNWVhNjliYmJlYjVjZiIsInN1YiI6IjY1M2IxNjE2Y2M5NjgzMDE0ZWI4MjEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7UIYM47J3rkdAbKkVNX5uzNonb4kSFhc3JR75HbXij4',
  },
};

const fetchMovies = async (endPoint = 'trending/all/week') => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${endPoint}`,
    options
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`Oops...`));
};

export default fetchMovies;
