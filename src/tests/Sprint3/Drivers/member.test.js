import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import Member from '../Stubs/Member';

afterEach(() => {
    cleanup();
})

test('should display members name',() => {
    const project = {ProjectMembers: ["tiisetso"]};
    render(<Member project={project}/>);

    const memberElement = screen.getByTestId('Member-stub-member');
    expect(memberElement).toHaveTextContent("tiisetso");
    
})

test('should display members index', () => {
    const project = { ProjectMembers: ["tiisetso"] };
    render(<Member project={project} />);

    const memberElement = screen.getByTestId('Member-stub-index');
    expect(memberElement).toHaveTextContent('1');

})

test('should display members role', () => {
    const project = { ProjectMembers: ["tiisetso"] };
    render(<Member project={project} />);

    const memberElement = screen.getByTestId('Member-stub-role');
    expect(memberElement).toHaveTextContent("Developer");

})