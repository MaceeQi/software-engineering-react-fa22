import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import TuitStats from "../components/tuits/tuit-stats";
import Tuits from "../components/tuits";

const MOCKED_USERS = [
    {username: 'alice', password: 'alice123', email: 'alice@wonderland.com', _id: "123"},
    {username: 'bob', password: 'bob123', email: 'bob@gmail.com', _id: "234"},
];

const MOCKED_TUITS = [
    {_id: "123", tuit: "alice's tuit", postedBy: MOCKED_USERS[0],
        stats: {replies: 5, retuits: 22, likes: 0, dislikes: 0}},
    {_id: "234", tuit: "bob's tuit", postedBy: MOCKED_USERS[1],
        stats: {replies: 5, retuits: 22, likes: 0, dislikes: 0}},
    {_id: "345", tuit: "wonderland's second", postedBy: MOCKED_USERS[0],
        stats: {replies: 5, retuits: 22, likes: 1, dislikes: 0}},
    {_id: "456", tuit: "hope's 2nd", postedBy: MOCKED_USERS[1],
        stats: {replies: 5, retuits: 22, likes: 1, dislikes: 0}},
    {_id: "567", tuit: "test dislike", postedBy: MOCKED_USERS[1],
        stats: {replies: 5, retuits: 22, likes: 0, dislikes: 1}},
    {_id: "456", tuit: "test second", postedBy: MOCKED_USERS[0],
        stats: {replies: 5, retuits: 22, likes: 0, dislikes: 1}},
];

const MOCKED_LIKES = [
    {
        _id: "123", tuit: MOCKED_TUITS[2], likedBy: MOCKED_USERS[0], type: "LIKED"
    },
    {
        _id: "234", tuit: MOCKED_TUITS[3], likedBy: MOCKED_USERS[0], type: "LIKED"
    },
];

const MOCKED_DISLIKES = [
    {
        _id: "345", tuit: MOCKED_TUITS[4], likedBy: MOCKED_USERS[1], type: "DISLIKED"
    },
    {
        _id: "456", tuit: MOCKED_TUITS[5], likedBy: MOCKED_USERS[1], type: "DISLIKED"
    },
];

test('test liking - tuit stats likes +1, solid thumbs up rendered', () => {
    const tuit = MOCKED_TUITS[0];
    const likeTuit = () => {
        tuit.stats.likes++;
    }

    const {rerender} = render(
        <HashRouter>
            <TuitStats tuit={tuit} likeTuit={likeTuit}/>
        </HashRouter>
    );

    // Check initial state - no likes or dislikes - 0 count and empty thumbs up/down renders
    const zeros = screen.getAllByText(/0/i);
    expect(zeros.length).toEqual(2);
    expect(screen.getByTitle("empty thumbs up")).toBeInTheDocument();
    expect(screen.getByTitle("empty thumbs down")).toBeInTheDocument();

    // Call like tuit function (same as what is passed to TuitStats component to imitate clicking like)
    likeTuit();

    // Rerender after liking
    rerender(
        <HashRouter>
            <TuitStats tuit={tuit} likeTuit={likeTuit}/>
        </HashRouter>
    )

    // check liked state - 1 like, 0 dislike - solid thumbs up, empty thumbs down
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(screen.getByTitle("solid thumbs up")).toBeInTheDocument();
    expect(screen.getByTitle("empty thumbs down")).toBeInTheDocument();
});

test('test disliking - tuit stats dislikes +1, solid thumbs down rendered', () => {
    const tuit = MOCKED_TUITS[1];
    const dislikeTuit = () => {
        tuit.stats.dislikes++;
    }

    const {rerender} = render(
        <HashRouter>
            <TuitStats tuit={tuit} dislikeTuit={dislikeTuit}/>
        </HashRouter>
    );

    // Check initial state - no likes or dislikes - 0 count and empty thumbs up/down renders
    const zeros = screen.getAllByText(/0/i);
    expect(zeros.length).toEqual(2);
    expect(screen.getByTitle("empty thumbs up")).toBeInTheDocument();
    expect(screen.getByTitle("empty thumbs down")).toBeInTheDocument();

    // Call like tuit function (same as what is passed to TuitStats component to imitate clicking dislike)
    dislikeTuit();

    // Rerender after disliking
    rerender(
        <HashRouter>
            <TuitStats tuit={tuit} dislikeTuit={dislikeTuit}/>
        </HashRouter>
    )

    // check liked state - 0 like, 1 dislike - solid thumbs down, empty thumbs up
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(screen.getByTitle("solid thumbs down")).toBeInTheDocument();
    expect(screen.getByTitle("empty thumbs up")).toBeInTheDocument();
});

test('test mylikes screen', () => {
    const findTuitsILike = () => {
        const likes = MOCKED_LIKES;
        const tuits = likes.map(like => like.tuit);
        return tuits;
    }

    const likedTuits = findTuitsILike();

    render(
        <HashRouter>
            <Tuits tuits={likedTuits}/>
        </HashRouter>
    );

    // Check mylikes screen of tuits renders as expected
    const solidThumbsUp = screen.getAllByTitle("solid thumbs up");
    expect(solidThumbsUp.length).toEqual(2);
    const emptyThumbsDown = screen.getAllByTitle("empty thumbs down");
    expect(emptyThumbsDown.length).toEqual(2);
    expect(screen.getByText(/wonderland's second/i)).toBeInTheDocument();
    expect(screen.getByText(/hope's 2nd/i)).toBeInTheDocument();
});

test('test mydislikes screen', () => {
    const findTuitsIDislike = () => {
        const dislikes = MOCKED_DISLIKES;
        const tuits = dislikes.map(dislike => dislike.tuit);
        return tuits;
    }

    const dislikedTuits = findTuitsIDislike();

    render(
        <HashRouter>
            <Tuits tuits={dislikedTuits}/>
        </HashRouter>
    );

    // Check mydislikes screen of tuits renders as expected
    const solidThumbsUp = screen.getAllByTitle("solid thumbs down");
    expect(solidThumbsUp.length).toEqual(2);
    const emptyThumbsDown = screen.getAllByTitle("empty thumbs up");
    expect(emptyThumbsDown.length).toEqual(2);
    expect(screen.getByText(/test dislike/i)).toBeInTheDocument();
    expect(screen.getByText(/test second/i)).toBeInTheDocument();
});

