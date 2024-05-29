import {render, screen} from "@testing-library/react";
import CartInput from "../src/components/CartInput.jsx";
import UserEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from "vitest";

describe('CartInput ', () => {
    const mocks = vi.hoisted(() => {
        return {
            useOutletContext: vi.fn()
        }
    })
    vi.mock('react-router-dom', () => ({
        useOutletContext: mocks.useOutletContext
    }));

    it("should render 'Add to Cart' button initially and input should be disabled", () => {
        mocks.useOutletContext.mockReturnValue({cart: {}, setCart: vi.fn()})
        render(<CartInput id="test-item"/>);

        const {button, input} = {button: screen.getByRole("button"), input: screen.getByRole("spinbutton")}

        expect(button.textContent).toMatch(/add to cart/i);
        expect(input).toBeDisabled();
    });
    it("should toggle button text and update quantity on click", async () => {
        mocks.useOutletContext.mockReturnValue({cart: {}, setCart: vi.fn()})
        render(<CartInput id="test-item"/>);

        const {button, input} = {button: screen.getByRole("button"), input: screen.getByRole("spinbutton")}
        const user = UserEvent.setup()

        await user.click(button);

        expect(button.textContent).toMatch(/in cart/i);
        expect(input).toHaveValue(1);
    });
    it("should not update cart quantity on input change when button has not yet been clicked", async () => {
        mocks.useOutletContext.mockReturnValue({cart: {}, setCart: vi.fn()})
        render(<CartInput id="test-item"/>);

        const {button, input} = {button: screen.getByRole("button"), input: screen.getByRole("spinbutton")}
        const user = UserEvent.setup()

        await user.type(input, "3");

        expect(button.textContent).toMatch(/add to cart/i);
        expect(input).toHaveValue(0);
    });

    it("should update cart quantity on input change when button has been clicked", async () => {
        mocks.useOutletContext.mockReturnValue({cart: {}, setCart: vi.fn()})
        render(<CartInput id="test-item"/>);

        const {button, input} = {button: screen.getByRole("button"), input: screen.getByRole("spinbutton")}
        const user = UserEvent.setup()

        await user.click(button)

        await user.clear(input)
        await user.type(input, "3");

        expect(button.textContent).toMatch(/in cart/i);
        expect(input).toHaveValue(3);
    });
    it("should reset cart quantity, when button is pressed twice", async () => {
        mocks.useOutletContext.mockReturnValue({cart: {}, setCart: vi.fn()})
        render(<CartInput id="test-item"/>);

        const {button, input} = {button: screen.getByRole("button"), input: screen.getByRole("spinbutton")}
        const user = UserEvent.setup()

        await user.click(button)
        await user.clear(input)
        await user.type(input, "3");
        await user.click(button)

        expect(button.textContent).toMatch(/add to cart/i);
        expect(input).toHaveValue(0);
    });

    it("should toggle button text and update quantity on click", async () => {
        const id = 5
        mocks.useOutletContext.mockReturnValue({cart: {id}, setCart: vi.fn()})

        render(<CartInput id={"id"}/>);

        expect(screen.getByRole("button").textContent).toMatch(/in cart/i);
        expect(screen.getByRole("spinbutton")).toHaveValue(id);
    });
});

