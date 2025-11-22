import '@testing-library/jest-dom';

// Mock window.scrollTo which is used in pagination handlers
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
