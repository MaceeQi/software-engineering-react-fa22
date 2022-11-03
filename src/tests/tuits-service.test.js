import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
    findTuitByUser
} from "../services/tuits-service";
import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
    // sample user to create tuit
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit
    const sampleTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;

    // setup test before running test
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(ripley);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove tuits created by sample user
        const tuits = await findTuitByUser(sampleUser.id);
        for (let each of tuits) {
            await deleteTuit(each._id)
        }

        // remove sample user we created
        await deleteUsersByUsername(sampleUser.username)
    })

    test('create tuit', async () => {
        // insert new tuit by sample user in the database
        const newTuit = await createTuit(sampleUser.id, sampleTuit);

        // verify inserted tuit's properties match expected
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleUser.id);
    })
});

describe('can delete tuit with REST API', () => {
    // sample user to create tuit
    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    // sample tuit
    const sampleTuit = {
        tuit: 'Thommas Sowell sample tuit'
    }

    let sampleUser;

    // set up the tests
    beforeAll(async () => {
        // create sample user to create tuit
        sampleUser = await createUser(sowell);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(sowell.username);
    })

    test('delete tuit', async () => {
        // create sample tuit to be deleted
        const newTuit = await createTuit(sampleUser.id, sampleTuit);

        // verify inserted tuit's properties match expected
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleUser.id);

        // delete tuit
        const status = await deleteTuit(newTuit._id);

        // verify we deleted tuit
        expect(status.deletedCount).toEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // sample user to create tuit
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    const sampleTuit = {
        tuit: 'Adam Smith sample tuit'
    };

    let sampleUser;
    let newTuit;

    // set up before running test
    beforeAll(async () => {
        // create sample user that will create tuit
        sampleUser = await createUser(adam);
    });

    // clean up after test
    afterAll(async () => {
        // remove any data created
        await deleteUsersByUsername(sampleUser.username);
        await deleteTuit(newTuit._id);
    });

    test('findTuitById', async () => {
        // create tuit
        newTuit = await createTuit(sampleUser.id, sampleTuit);

        // verify inserted tuit's properties match expected
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleUser.id);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(newTuit.tuit);
        expect(existingTuit.postedBy._id).toEqual(newTuit.postedBy);
        expect(existingTuit.postedBy.username).toEqual(sampleUser.username);
    })
});

describe('can retrieve all tuits with REST API', () => {
    // sample user that will create tuits
    const larry = {
        username: 'larry',
        password: 'larry123',
        email: 'larry@gmail.com'
    };

    // sample tuits that sample user will insert then retrieve
    const tuits = [
        'test tuit 1', 'test tuit 2', 'test tuit 3'
    ];

    let sampleUser;
    let createdTuits = [];

    // set up data before test
    beforeAll(async () => {
        // create sample user that will create multiple test tuits
        sampleUser = await createUser(larry);

        // create test tuits
        for (let tuit of tuits) {
            createdTuits.push(await createTuit(sampleUser.id, {tuit}));
        };
    });

    // clean up after test
    afterAll(async () => {
        // delete tuits
        for (let tuit of createdTuits) {
            await deleteTuit(tuit._id);
        };

        // delete user
        await deleteUsersByUsername(sampleUser.username);
    });

    test('findAllTuits', async () => {
        // retrieve all tuits
        const allTuits = await findAllTuits();

        // there should be a min number of tuits
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // check each tuit we inserted
        const tuitsWeInserted = allTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0
        );

        // compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitBody = tuits.find(eachTuit => eachTuit === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitBody);
            expect(tuit.postedBy._id).toEqual(sampleUser.id);
            expect(tuit.postedBy.username).toEqual(sampleUser.username);
        });
    });
});