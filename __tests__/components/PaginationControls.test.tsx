import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from '../../components/PaginationControls';

describe('PaginationControls', () => {
  it('does not render when loading or error or no articles', () => {
    const { container } = render(
      <PaginationControls
        loading={true}
        error={null}
        articlesLength={5}
        page={1}
        totalPages={3}
        handlePrevPage={() => {}}
        handleNextPage={() => {}}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders and responds to prev/next clicks', () => {
    const prev = jest.fn();
    const next = jest.fn();
    render(
      <PaginationControls
        loading={false}
        error={null}
        articlesLength={5}
        page={2}
        totalPages={3}
        handlePrevPage={prev}
        handleNextPage={next}
      />
    );

    expect(screen.getByText('page', { exact: false })).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Previous/i));
    expect(prev).toHaveBeenCalled();
    fireEvent.click(screen.getByText(/Next/i));
    expect(next).toHaveBeenCalled();
  });
});
