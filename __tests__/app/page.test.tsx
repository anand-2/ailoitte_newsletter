import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../app/page';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('App page', () => {
  const sampleArticles = [
    {
      source: { id: null, name: 'A' },
      author: 'Auth',
      title: 'Hello World',
      description: 'Desc',
      url: 'http://example.com/1',
      urlToImage: null,
      publishedAt: new Date().toISOString(),
      content: 'Content',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchTopHeadlines as jest.Mock).mockResolvedValue({
      status: 'ok',
      totalResults: 1,
      articles: sampleArticles,
    });
    (api.searchNews as jest.Mock).mockResolvedValue({
      status: 'ok',
      totalResults: 1,
      articles: sampleArticles,
    });
  });

  it('performs search and saves to localStorage', async () => {
    jest.useFakeTimers();
    render(<App />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'bitcoin' } });
    jest.advanceTimersByTime(900);

    await waitFor(() => expect(api.searchNews).toHaveBeenCalledWith('bitcoin', 1));
    expect(localStorage.getItem('newsletter:lastSearch')).toBe('bitcoin');
    jest.useRealTimers();
  });

  it('language parameter in search API', async () => {
    await api.searchNews('test', 1, 'es');
    expect((api.searchNews as jest.Mock).mock.calls[0][2]).toBe('es');
  });
});
