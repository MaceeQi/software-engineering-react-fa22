import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
    {username: 'alice', password: 'alice123', email: 'alice@wonderland.com', _id: "123"},
    {username: 'bob', password: 'bob123', email: 'bob@gmail.com', _id: "234"},
    {username: 'charlie', password: 'charlie123', email: 'charlie@yahoo.com', _id: "456"}
];

const MOCKED_TUITS = [
    {_id: "123", tuit: "alice's tuit", postedBy: MOCKED_USERS[0]._id},
    {_id: "234", tuit: "bob's tuit", postedBy: MOCKED_USERS[1]._id},
    {_id: "456", tuit: "charlie's tuit", postedBy: MOCKED_USERS[2]._id}
];

test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
          <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>
    );
    const user = screen.getByText(/alice/i);
    const tuit = screen.getByText(/alice's tuit/i);
    expect(user).toBeInTheDocument();
    expect(tuit).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );

    const user = screen.getByText(/charlie/i);
    const tuit = screen.getByText(/peanuts are good for you/i);
    expect(user).toBeInTheDocument();
    expect(tuit).toBeInTheDocument();
})

describe('mock axios - tuit list renders mocked', () => {
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

        const user = screen.getByText(/alice/i);
        const tuit = screen.getByText(/alice's tuit/i);
        expect(user).toBeInTheDocument();
        expect(tuit).toBeInTheDocument();
    });
});

