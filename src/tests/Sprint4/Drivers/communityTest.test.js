import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import Community from '../Stubs/communityTest';

afterEach(() => {
    cleanup();
})

test('should check instagram link', () => {
    render(<Community />);

    const memberElement = screen.getByTestId('insta-stub');
    (memberElement).getAttribute('href') ===  "https://instagram.com/lion_workspace?r=nametag";

})

test('should check twitter link', () => {
    render(<Community />);

    const memberElement = screen.getByTestId('twitter-stub');
    (memberElement).getAttribute('href') === "https://twitter.com/LionWorkspace?t=eb7NU-i-HOA8eODI3O9ulw&s=09";

})

test('should check facebook link', () => {
    render(<Community />);

    const memberElement = screen.getByTestId('fb-stub');
    (memberElement).getAttribute('href') === "https://facebook.com/profile.php?id=100087087979920";

})

test('should check linkedin link', () => {
    render(<Community />);

    const memberElement = screen.getByTestId('linkedin-stub');
    (memberElement).getAttribute('href') === "https://linkedin.com/in/lion-workspace-9043b5255";

})
