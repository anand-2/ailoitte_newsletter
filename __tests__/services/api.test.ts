import axios from 'axios';
import { fetchTopHeadlines, searchNews } from '../../services/api';
import { NewsApiResponse } from '../../types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('services/api', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetchTopHeadlines returns data when API responds successfully', async () => {
    const mockData: NewsApiResponse = {
      status: 'ok',
      totalResults: 1,
      articles: [
        {
          source: { id: null, name: 'Test' },
          author: 'Author',
          title: 'Title',
          description: 'Desc',
          url: 'http://example.com',
          urlToImage: null,
          publishedAt: new Date().toISOString(),
          content: 'Content',
        },
      ],
    };

    const getMock = jest.fn().mockResolvedValue({ data: mockData });
    mockedAxios.create = jest.fn().mockReturnValue({
      get: getMock,
      interceptors: { response: { use: jest.fn() } },
    } as any);

    const res = await fetchTopHeadlines('general' as any, 1);

    expect(res).toEqual(mockData);
    expect(getMock).toHaveBeenCalledWith('/top-headlines', expect.any(Object));
  });

  it('searchNews returns empty when query is empty', async () => {
    const res = await searchNews('', 1);
    expect(res.status).toBe('ok');
    expect(res.articles).toHaveLength(0);
  });

  it('searchNews calls axios and returns data', async () => {
    const mockData: NewsApiResponse = {
      status: 'ok',
      totalResults: 2,
      articles: [],
    };

    const getMock = jest.fn().mockResolvedValue({ data: mockData });
    mockedAxios.create = jest.fn().mockReturnValue({
      get: getMock,
      interceptors: { response: { use: jest.fn() } },
    } as any);

    const res = await searchNews('test', 1);
    expect(res).toEqual(mockData);
    expect(getMock).toHaveBeenCalledWith('/everything', expect.any(Object));
  });
});
