import {render, screen} from '@testing-library/react';
import ProductDetail from './../src/pages/ProductDetail'; // Assuming ProductDetail is in the same directory
import {describe, expect, it, vi} from "vitest";

describe('Product Details', () => {
    const mocks = vi.hoisted(() => {
        return {
            useParams: vi.fn(),
        }
    })
    vi.mock('react-router-dom', () => ({
        useParams: mocks.useParams,
        useOutletContext: () => ({
            cart: {}, setCart: vi.fn(),
            data: [ // Mock data example (same as before)
                {
                    id: 1,
                    title: 'Product 1',
                    description: 'This is a cool product',
                    price: 19.99,
                    image: 'path/to/image.jpg'
                },
                {
                    id: 2,
                    title: 'Product 2',
                    description: 'Another great product',
                    price: 24.99,
                    image: 'path/to/another/image.jpg'
                }
            ]
        })
    }));


    it('renders product details for a valid ID', () => {
        mocks.useParams.mockReturnValue({id: 1});

        render(<ProductDetail/>);

        const title = screen.getByText('Product 1');
        const description = screen.getByText('This is a cool product');
        const price = screen.getByText('$19.99');
        const cartInput = screen.getByRole('button'); // Assuming CartInput renders a button

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(cartInput).toBeInTheDocument();
    });

it('renders error message for an invalid ID', () => {
    mocks.useParams.mockReturnValue({id: 99});

    render(<ProductDetail/>);

    const errorMessage = screen.getByText('Error: Invalid ID');
    const homeLink = screen.getByRole('link'); // Assuming the link has a role of "link"

    expect(errorMessage).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/'); // Verify link points to home
});

});