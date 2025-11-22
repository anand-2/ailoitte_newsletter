import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsCard from '../../components/NewsCard';

const article = {
  source: { id: null, name: 'Test Source' },
  author: 'John Doe',
  title: 'Test Title',
  description: 'Test description',
  url: 'http://example.com',
  urlToImage: null,
  publishedAt: new Date().toISOString(),
  content: 'Full content',
};

describe('NewsCard', () => {
  it('renders title and calls onClick when container clicked', () => {
    const onClick = jest.fn();
    render(<NewsCard article={article as any} onClick={onClick} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Title'));
    expect(onClick).toHaveBeenCalled();
  });

  it('opens external link when external button clicked', () => {
    const onClick = jest.fn();
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    render(<NewsCard article={article as any} onClick={onClick} />);

    const btn = screen.getByRole('button', { hidden: true });
    fireEvent.click(btn);
    expect(openSpy).toHaveBeenCalledWith('http://example.com', '_blank');
    openSpy.mockRestore();
  });
});
