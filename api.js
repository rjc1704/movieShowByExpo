const API_KEY = "558a876e694085f8a052d267914acde2";

const BASE_URL = "https://api.themoviedb.org/3";

export const movieApi = {
  getTrending: () =>
    fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  getUpcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json()),
  getNowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie/?api_key=${API_KEY}&query=${query}`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  getTrending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  getAiringToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  getTopRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv/?api_key=${API_KEY}&query=${query}`
    ).then((res) => res.json());
  },
};
