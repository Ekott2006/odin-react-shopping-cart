import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from "../src/pages/Home.jsx";

describe('App', () => {
  it('renders headline', () => {
    render(<Home />);
    expect(screen.getByRole("heading")).toHaveTextContent("Welcome to Amazon Clone")
  });
});