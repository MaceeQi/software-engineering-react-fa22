import {
    userTogglesTuitDislikes,
    userTogglesTuitLikes,
    findAllTuitsLikedByUser,
    findAllTuitsDislikedByUser,
    userUnlikesTuit
} from "../services/likes-service";
import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";
import {
    createTuit,
    deleteTuit,
    findTuitById
} from "../services/tuits-service";

describe('can like a tuit when not already liked or disliked', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const newTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;
    let sampleTuit;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuit by sample user
        sampleTuit = await createTuit(sampleUser._id, newTuit);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit._id)
    })

    test('like tuit when not already liked or disliked', async () => {
        // like tuit
        await userTogglesTuitLikes(sampleUser._id, sampleTuit._id);

        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser._id);
        expect(newLikes.length).toEqual(1);

        // check like created is the expected tuit
        const newLike = newLikes[0];
        expect(newLike.tuit).toEqual(sampleTuit.tuit);
        expect(newLike.postedBy._id).toEqual(sampleUser._id);

        // check tuit stats updated
        const likedTuit = await findTuitById(sampleTuit._id);
        expect(likedTuit.stats.likes).toEqual(1);
        expect(likedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can like a tuit when already liked', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const newTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;
    let sampleTuit;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuit by sample user
        sampleTuit = await createTuit(sampleUser._id, newTuit);

        // like tuit
        await userTogglesTuitLikes(sampleUser._id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit._id)
    })

    test('like tuit when already liked', async () => {
        // like tuit again (already liked)
        await userTogglesTuitLikes(sampleUser._id, sampleTuit._id);

        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser._id);
        expect(newLikes.length).toEqual(0);

        // check tuit stats updated
        const likedTuit = await findTuitById(sampleTuit._id);
        expect(likedTuit.stats.likes).toEqual(0);
        expect(likedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can dislike a tuit when not already disliked or liked', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const newTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;
    let sampleTuit;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuit by sample user
        sampleTuit = await createTuit(sampleUser._id, newTuit);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit._id)
    })

    test('dislike tuit when not already liked or disliked', async () => {
        // dislike tuit
        await userTogglesTuitDislikes(sampleUser._id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser._id);
        expect(newDislikes.length).toEqual(1);

        // check disliked tuit returned is correct tuit
        const newDislike = newDislikes[0];
        expect(newDislike.tuit).toEqual(sampleTuit.tuit);
        expect(newDislike.postedBy._id).toEqual(sampleUser._id);

        // check tuit stats updated
        const dislikedTuit = await findTuitById(sampleTuit._id);
        expect(dislikedTuit.stats.likes).toEqual(0);
        expect(dislikedTuit.stats.dislikes).toEqual(1);
    });
});

describe('can dislike a tuit when already disliked', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const newTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;
    let sampleTuit;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuit by sample user
        sampleTuit = await createTuit(sampleUser._id, newTuit);

        // dislike tuit
        await userTogglesTuitDislikes(sampleUser._id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit._id)
    })

    test('dislike tuit when already disliked', async () => {
        // dislike tuit again (already disliked)
        await userTogglesTuitDislikes(sampleUser._id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser._id);
        expect(newDislikes.length).toEqual(0);

        // check tuit stats updated
        const dislikedTuit = await findTuitById(sampleTuit._id);
        expect(dislikedTuit.stats.likes).toEqual(0);
        expect(dislikedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can like a tuit when already disliked', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const newTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;
    let sampleTuit;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuit by sample user
        sampleTuit = await createTuit(sampleUser._id, newTuit);

        // dislike tuit
        await userTogglesTuitDislikes(sampleUser._id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit._id)
    })

    test('like tuit when already disliked', async () => {
        // like tuit that has already been disliked
        await userTogglesTuitLikes(sampleUser._id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser._id);
        expect(newDislikes.length).toEqual(0);
        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser._id);
        expect(newLikes.length).toEqual(1);

        // check like has expected tuit
        const newLike = newLikes[0];
        expect(newLike.tuit).toEqual(sampleTuit.tuit);
        expect(newLike.postedBy._id).toEqual(sampleUser._id);

        // check tuit stats updated
        const likedTuit = await findTuitById(sampleTuit._id);
        expect(likedTuit.stats.likes).toEqual(1);
        expect(likedTuit.stats.dislikes).toEqual(0);
    });
});

describe('can dislike a tuit when already liked', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const newTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;
    let sampleTuit;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuit by sample user
        sampleTuit = await createTuit(sampleUser._id, newTuit);

        // like tuit
        await userTogglesTuitLikes(sampleUser._id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit._id)
    })

    test('dislike tuit when already liked', async () => {
        // dislike tuit that has already been liked
        await userTogglesTuitDislikes(sampleUser._id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser._id);
        expect(newDislikes.length).toEqual(1);
        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser._id);
        expect(newLikes.length).toEqual(0);

        // check dislike is of expected tuit
        const newDislike = newDislikes[0];
        expect(newDislike.tuit).toEqual(sampleTuit.tuit);
        expect(newDislike.postedBy._id).toEqual(sampleUser._id);

        // check tuit stats updated
        const likedTuit = await findTuitById(sampleTuit._id);
        expect(likedTuit.stats.likes).toEqual(0);
        expect(likedTuit.stats.dislikes).toEqual(1);
    });
});

describe('can find my liked tuits', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuits
    const newTuit = [
        {
            tuit: 'Ellen Ripley sample tuit'
        },
        {
            tuit: 'sample tuit'
        },
        {
            tuit: 'another sample tuit'
        }
    ];

    let sampleUser;
    let sampleTuit1;
    let sampleTuit2;
    let sampleTuit3;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuits by sample user
        sampleTuit1 = await createTuit(sampleUser._id, newTuit[0]);
        sampleTuit2 = await createTuit(sampleUser._id, newTuit[1]);
        sampleTuit3 = await createTuit(sampleUser._id, newTuit[2]);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit1._id);
        await deleteTuit(sampleTuit2._id);
        await deleteTuit(sampleTuit3._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username);

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit1._id);
        await userUnlikesTuit(sampleUser._id, sampleTuit2._id);
        await userUnlikesTuit(sampleUser._id, sampleTuit3._id);
    })

    test('can find my liked tuits', async () => {
        // like tuit 1, 3
        await userTogglesTuitLikes(sampleUser._id, sampleTuit1._id);
        await userTogglesTuitLikes(sampleUser._id, sampleTuit3._id);

        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser._id);
        expect(newLikes.length).toEqual(2);

        // ensure likes returned for mylikes screen are the expected tuits
        // check like created is of expected tuit
        const newLike1 = newLikes[0];
        expect(newLike1.tuit).toEqual(sampleTuit1.tuit);
        expect(newLike1.postedBy._id).toEqual(sampleUser._id);
        // check tuit stats updated
        const likedTuit1 = await findTuitById(sampleTuit1._id);
        expect(likedTuit1.stats.likes).toEqual(1);
        expect(likedTuit1.stats.dislikes).toEqual(0);

        // check like created is of expected tuit
        const newLike2 = newLikes[1];
        expect(newLike2.tuit).toEqual(sampleTuit3.tuit);
        expect(newLike2.postedBy._id).toEqual(sampleUser._id);
        // check tuit stats updated
        const likedTuit2 = await findTuitById(sampleTuit3._id);
        expect(likedTuit2.stats.likes).toEqual(1);
        expect(likedTuit2.stats.dislikes).toEqual(0);
    });
});

describe('can find my disliked tuits', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuits
    const newTuit = [
        {
            tuit: 'Ellen Ripley sample tuit'
        },
        {
            tuit: 'sample tuit'
        },
        {
            tuit: 'another sample tuit'
        }
    ];

    let sampleUser;
    let sampleTuit1;
    let sampleTuit2;
    let sampleTuit3;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);

        // create sample tuits by sample user
        sampleTuit1 = await createTuit(sampleUser._id, newTuit[0]);
        sampleTuit2 = await createTuit(sampleUser._id, newTuit[1]);
        sampleTuit3 = await createTuit(sampleUser._id, newTuit[2]);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit1._id);
        await deleteTuit(sampleTuit2._id);
        await deleteTuit(sampleTuit3._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username);

        // remove likes created in tests
        await userUnlikesTuit(sampleUser._id, sampleTuit1._id);
        await userUnlikesTuit(sampleUser._id, sampleTuit2._id);
        await userUnlikesTuit(sampleUser._id, sampleTuit3._id);
    })

    test('can find my disliked tuits', async () => {
        // dislike tuit 1, 2
        await userTogglesTuitDislikes(sampleUser._id, sampleTuit1._id);
        await userTogglesTuitDislikes(sampleUser._id, sampleTuit2._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser._id);
        expect(newDislikes.length).toEqual(2);

        // ensure dislikes returned for my dislikes screen are the expected tuits
        // check dislike created is of expected tuit
        const newDislike1 = newDislikes[0];
        expect(newDislike1.tuit).toEqual(sampleTuit1.tuit);
        expect(newDislike1.postedBy._id).toEqual(sampleUser._id);
        // check tuit stats updated
        const dislikedTuit1 = await findTuitById(sampleTuit1._id);
        expect(dislikedTuit1.stats.likes).toEqual(0);
        expect(dislikedTuit1.stats.dislikes).toEqual(1);

        // check dislike created is of expected tuit
        const newDislike2 = newDislikes[1];
        expect(newDislike2.tuit).toEqual(sampleTuit2.tuit);
        expect(newDislike2.postedBy._id).toEqual(sampleUser._id);
        // check tuit stats updated
        const dislikedTuit2 = await findTuitById(sampleTuit2._id);
        expect(dislikedTuit2.stats.likes).toEqual(0);
        expect(dislikedTuit2.stats.dislikes).toEqual(1);
    });
});

