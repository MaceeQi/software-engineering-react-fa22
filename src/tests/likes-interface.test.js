import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
    {username: 'alice', password: 'alice123', email: 'alice@wonderland.com', _id: "123"},
    {username: 'bob', password: 'bob123', email: 'bob@gmail.com', _id: "234"},
];

const MOCKED_TUITS = [
    {_id: "123", tuit: "alice's tuit", postedBy: MOCKED_USERS[0],
        stats: {replies: 0, retuits: 0, likes: 523, dislikes: 4656}},
    {_id: "234", tuit: "bob's tuit", postedBy: MOCKED_USERS[1],
        stats: {replies: 0, retuits: 0, likes: 0, dislikes: 0}},
];

test('tuit list renders static tuit array with stats', () => {
    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>
    );

    expect(screen.getByText(/523/i)).toBeInTheDocument();
    expect(screen.getByText(/4656/i)).toBeInTheDocument();
    expect(screen.getByTitle("solid thumbs up")).toBeInTheDocument();
    expect(screen.getByTitle("solid thumbs down")).toBeInTheDocument();
    expect(screen.getByTitle("empty thumbs up")).toBeInTheDocument();
    expect(screen.getByTitle("solid thumbs down")).toBeInTheDocument();
});

test('tuit list renders async with stats', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );

    expect(screen.getByTitle("solid thumbs up")).toBeInTheDocument();
    expect(screen.getByTitle("solid thumbs down")).toBeInTheDocument();
})

describe('mock axios - tuit list with stats renders mocked', () => {
    beforeAll(() => {
        jest.spyOn(axios, 'get').mockImplementation()
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('tuit list renders mocked', async () => {
        axios.get.mockImplementation(() =>
                                         Promise.resolve({data: {tuits: MOCKED_TUITS}}));
        const response = await findAllTuits();
        const tuits = response.tuits;

        render(
            <HashRouter>
                <Tuits tuits={tuits}/>
            </HashRouter>
        );

        expect(screen.getByText(/523/i)).toBeInTheDocument();
        expect(screen.getByText(/4656/i)).toBeInTheDocument();
        expect(screen.getByTitle("solid thumbs up")).toBeInTheDocument();
        expect(screen.getByTitle("solid thumbs down")).toBeInTheDocument();
        expect(screen.getByTitle("empty thumbs up")).toBeInTheDocument();
        expect(screen.getByTitle("solid thumbs down")).toBeInTheDocument();
    });
});

