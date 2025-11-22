import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../components/NavBar';
import { Category } from '../../types';

describe('NavBar', () => {
  const commonProps = {
    darkMode: false,
    setDarkMode: jest.fn(),
    mobileMenuOpen: false,
    setMobileMenuOpen: jest.fn(),
    searchQuery: '',
    handleSearch: jest.fn(),
    setActiveCategory: jest.fn(),
    setIsSearching: jest.fn(),
    setSearchQuery: jest.fn(),
    setSelectedArticle: jest.fn(),
    activeCategory: Category.GENERAL,
  };

  it('renders and calls handleSearch on input change', () => {
    render(<NavBar {...commonProps} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(commonProps.handleSearch).toHaveBeenCalled();
  });

  it('toggles mobile menu when menu button clicked', () => {
    const setMobileMenuOpen = jest.fn();
    render(<NavBar {...commonProps} setMobileMenuOpen={setMobileMenuOpen} />);
    const btn = screen.getByRole('button', { name: /news_home_menu_toggle|Menu/i }) || screen.getAllByRole('button')[0];
    fireEvent.click(btn);
    expect(setMobileMenuOpen).toHaveBeenCalled();
  });
});
