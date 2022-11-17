import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import Insights from '../Stubs/Insights';

const userStories = [
    { UserStory: "this is just a test1", UserPoster: "tiisetso", AssignedTo: "bob", UserStatus: "New" },
    { UserStory: "this is just a test2", UserPoster: "tiisetso", AssignedTo: "bob", UserStatus: "Done" },
    { UserStory: "this is just a test3", UserPoster: "tiisetso", AssignedTo: "bob", UserStatus: "New" },
    { UserStory: "this is just a test4", UserPoster: "tiisetso", AssignedTo: "bob", UserStatus: "In Progress" },
    { UserStory: "this is just a test5", UserPoster: "tiisetso", AssignedTo: "bob", UserStatus: "Done" }];


afterEach(() => {
    cleanup();
})

test('should display members name', () => {
    const project = { ProjectMembers: ["tiisetso"] };
    render(<Insights userStories={userStories} />);

    const newElement = screen.getByTestId('Insights-new');
    expect(newElement).toHaveTextContent("2");

})

test('should display members name', () => {
    const project = { ProjectMembers: ["tiisetso"] };
    render(<Insights userStories={userStories} />);

    const newElement = screen.getByTestId('Insights-in-progress');
    expect(newElement).toHaveTextContent("1");

})

test('should display members name', () => {
    const project = { ProjectMembers: ["tiisetso"] };
    render(<Insights userStories={userStories} />);

    const newElement = screen.getByTestId('Insights-done');
    expect(newElement).toHaveTextContent("2");

})


