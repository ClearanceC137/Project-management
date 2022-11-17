import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

const tests = require("../Stubs/Kanban");

const Kanban = tests[0];
const storyChanger = tests[1];
const storyPoster = tests[2];
const storyAssignee = tests[3];
const storyStatus = tests[4];

const userStories = { UserStory: "this is just a test", UserPoster: "tiisetso", AssignedTo: "bob", UserStatus: "New" };


afterEach(() => {
    cleanup();
})

test('should display each user story', () => {
    render(<Kanban userStories={userStories} />);
    const storyElement = screen.getByTestId('Kanban-story');
    expect(storyElement).toHaveTextContent("this is just a test");

})

test('should display each user poster', () => {
    render(<Kanban userStories={userStories} />);
    const storyElement = screen.getByTestId('Kanban-poster');
    expect(storyElement).toHaveTextContent("tiisetso");

})

test('should display each user assignee', () => {
    render(<Kanban userStories={userStories} />);
    const storyElement = screen.getByTestId('Kanban-assignee');
    expect(storyElement).toHaveTextContent("bob");

})

test('should display each user status', () => {
    render(<Kanban userStories={userStories} />);
    const storyElement = screen.getByTestId('Kanban-status');
    expect(storyElement).toHaveTextContent("New");

})

test("tries to update a story", () => {
    expect(storyChanger(userStories, "this is a new test")).toStrictEqual({ AssignedTo: "bob", UserPoster: "tiisetso", UserStatus: "New", UserStory: "this is a new test", })
})

test("tries to update a story poster", () => {
    expect(storyPoster(userStories, "paula")).toStrictEqual({ AssignedTo: "bob", UserPoster: "paula", UserStatus: "New", UserStory: "this is a new test", })
})

test("tries to update a story assignee", () => {
    expect(storyAssignee(userStories, "larry")).toStrictEqual({ AssignedTo: "larry", UserPoster: "paula", UserStatus: "New", UserStory: "this is a new test", })
})

test("tries to update a story status", () => {
    expect(storyStatus(userStories, "In Progress")).toStrictEqual({ AssignedTo: "larry", UserPoster: "paula", UserStatus: "In Progress", UserStory: "this is a new test", })
})
