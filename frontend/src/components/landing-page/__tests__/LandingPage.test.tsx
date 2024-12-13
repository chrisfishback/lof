import {describe, expect, it} from "vitest";
import {render, screen} from '@testing-library/react'
import {LandingPage} from "../LandingPage.tsx";

describe('Landing Page', () => {
    it('should display landing page text upon loading App.tsx', () => {
        render(<LandingPage/>)

        expect(true).toEqual(true)
        expect(screen.getByText("Home")).toBeVisible();
    });
});