import {render, screen} from '@testing-library/react';
import App from './../src/App'; // Assuming App is in the same directory
import {describe, expect, test, vi} from "vitest";

describe('App', () => {
    vi.mock('react-router-dom', () => ({
        // eslint-disable-next-line react/prop-types
        Link: ({children, ...props}) => <a {...props}>{children}</a>, // Mock Link component
        NavLink: ({children, ...props}) => <a {...props}>{children}</a>, // Mock Link component
        Outlet: vi.fn(),
        useLoaderData: vi.fn()
    }));

    test('renders header with link to home and cart total', () => {
        render(<App/>);

        const homeLink = screen.getByText('Amazon Clone');
        const productsLink = screen.getByText('Products');
        const cartTotal = screen.getByText('Cart: 0'); // Assuming initial cart is empty

        expect(homeLink).toBeInTheDocument();
        expect(productsLink).toBeInTheDocument();
        expect(cartTotal).toBeInTheDocument();
    });

});
