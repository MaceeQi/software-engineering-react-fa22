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
        sampleTuit = await createTuit(sampleUser.id, newTuit);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser.id, sampleTuit._id)
    })

    test('like tuit when not already liked or disliked', async () => {
        // like tuit
        await userTogglesTuitLikes(sampleUser.id, sampleTuit._id);

        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser.id);
        expect(newLikes.length).toEqual(1);

        // check like created is LIKED type and has expected tuit and user
        const newLike = newLikes[0];
        expect(newLike.tuit._id).toEqual(sampleTuit._id);
        expect(newLike.tuit.postedBy).toEqual(sampleUser.id);
        expect(newLike.likedBy).toEqual(sampleUser.id);
        expect(newLike.type).toEqual('LIKED');

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
        sampleTuit = await createTuit(sampleUser.id, newTuit);

        // like tuit
        await userTogglesTuitLikes(sampleUser.id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser.id, sampleTuit._id)
    })

    test('like tuit when already liked', async () => {
        // like tuit again (already liked)
        await userTogglesTuitLikes(sampleUser.id, sampleTuit._id);

        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser.id);
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
        sampleTuit = await createTuit(sampleUser.id, newTuit);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser.id, sampleTuit._id)
    })

    test('dislike tuit when not already liked or disliked', async () => {
        // dislike tuit
        await userTogglesTuitDislikes(sampleUser.id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser.id);
        expect(newDislikes.length).toEqual(1);

        // check like created is DISLIKED type and has expected tuit and user
        const newDislike = newDislikes[0];
        expect(newDislike.tuit._id).toEqual(sampleTuit._id);
        expect(newDislike.tuit.postedBy).toEqual(sampleUser.id);
        expect(newDislike.likedBy).toEqual(sampleUser.id);
        expect(newDislike.type).toEqual('DISLIKED');

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
        sampleTuit = await createTuit(sampleUser.id, newTuit);

        // dislike tuit
        await userTogglesTuitDislikes(sampleUser.id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser.id, sampleTuit._id)
    })

    test('dislike tuit when already disliked', async () => {
        // dislike tuit again (already disliked)
        await userTogglesTuitDislikes(sampleUser.id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser.id);
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
        sampleTuit = await createTuit(sampleUser.id, newTuit);

        // dislike tuit
        await userTogglesTuitDislikes(sampleUser.id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser.id, sampleTuit._id)
    })

    test('like tuit when already disliked', async () => {
        // like tuit that has already been disliked
        await userTogglesTuitLikes(sampleUser.id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser.id);
        expect(newDislikes.length).toEqual(0);
        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser.id);
        expect(newLikes.length).toEqual(1);

        // check like has been changed to LIKED type and has expected tuit and user
        const newLike = newLikes[0];
        expect(newLike.tuit._id).toEqual(sampleTuit._id);
        expect(newLike.tuit.postedBy).toEqual(sampleUser.id);
        expect(newLike.likedBy).toEqual(sampleUser.id);
        expect(newLike.type).toEqual('LIKED');

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
        sampleTuit = await createTuit(sampleUser.id, newTuit);

        // like tuit
        await userTogglesTuitLikes(sampleUser.id, sampleTuit._id);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        await deleteTuit(sampleTuit._id);

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)

        // remove likes created in tests
        await userUnlikesTuit(sampleUser.id, sampleTuit._id)
    })

    test('dislike tuit when already liked', async () => {
        // dislike tuit that has already been liked
        await userTogglesTuitDislikes(sampleUser.id, sampleTuit._id);

        // get dislikes made by sample user
        const newDislikes = await findAllTuitsDislikedByUser(sampleUser.id);
        expect(newDislikes.length).toEqual(1);
        // get likes made by sample user
        const newLikes = await findAllTuitsLikedByUser(sampleUser.id);
        expect(newLikes.length).toEqual(0);

        // check like has been changed to DISLIKED type and has expected tuit and user
        const newDislike = newDislikes[0];
        expect(newDislike.tuit._id).toEqual(sampleTuit._id);
        expect(newDislike.tuit.postedBy).toEqual(sampleUser.id);
        expect(newDislike.likedBy).toEqual(sampleUser.id);
        expect(newDislike.type).toEqual('DISLIKED');

        // check tuit stats updated
        const likedTuit = await findTuitById(sampleTuit._id);
        expect(likedTuit.stats.likes).toEqual(0);
        expect(likedTuit.stats.dislikes).toEqual(1);
    });
});

