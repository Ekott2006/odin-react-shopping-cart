import {render, screen} from '@testing-library/react';
import Shop from './../src/pages/Shop'; // Assuming Shop is in the same directory
import {expect, test, vi} from "vitest"

test('renders Shop component with product list and cart input', () => {
    vi.mock('react-router-dom', () => ({
        // eslint-disable-next-line react/prop-types
        Link: ({children, ...props}) => <a {...props}>{children}</a>, // Mock Link component
        useOutletContext: () => ({
            cart: {}, setCart: vi.fn(),
            data: [ // Mock data example
                {id: 1, title: 'Product 1', price: 19.99, image: 'path/to/image.jpg'}
            ]
        })
    }));
    render(<Shop/>);

    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
});
