const sinon = require('sinon');
const { Test } = require('@nestjs/testing');
const _ = require('lodash');
const {assert} = require('chai');

const { createStubbedModel } = require('../helpers');
const { CoffeeCardService } = require('../../../src/modules/coffeCard/CoffeeCardService');
const { getModelToken } = require('../../../src/modules/database/ModelsProvider');
const { ESchemaName } = require('../../../src/models/schemasMap');


describe('Modules | CoffeeCard | CoffeeCardService', () => {
    let CoffeeCard;
    let CoffeeImage;
    let coffeeCardService;
    let sandbox;

    beforeEach(async () => {
        sandbox = sinon.createSandbox();

        CoffeeCard = createStubbedModel(sandbox);
        CoffeeImage = createStubbedModel(sandbox);

        const testModule = await Test.createTestingModule({
            providers: [
                CoffeeCardService,
                {
                    provide: getModelToken(ESchemaName.CoffeeCard),
                    useValue: CoffeeCard,
                },
                {
                    provide: getModelToken(ESchemaName.CoffeeImage),
                    useValue: CoffeeImage,
                }
            ],
        }).compile();

        coffeeCardService = testModule.get(CoffeeCardService);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createCard', () => {
        const coffeeCardPayload = {
            blendName: 'test',
            origin: 'originTest',
            variety: 'varietyTest',
            notes: ['note1', 'note2'],
            intensifier: 'intensifierTest',
            image: 'imageTest',
        }

        let coffeeCard;
        let coffeeImage;

        beforeEach(() => {
            coffeeCard = {... _.omit(coffeeCardPayload, ['image']), _coffeeImage: 'imageId'};
            coffeeImage = { _id: 'imageId'};

            CoffeeCard.create.resolves(coffeeCard);
            CoffeeImage.create.resolves(coffeeImage);
        });

        it('should call CoffeeImage.create with arg', async () => {
            await coffeeCardService.createCard(coffeeCardPayload);

            sandbox.assert.calledOnceWithExactly(CoffeeImage.create, {src: coffeeCardPayload.image});
        })

        it('should call CoffeeCard.create with arg', async () => {
            await coffeeCardService.createCard(coffeeCardPayload);

            sandbox.assert.calledOnceWithExactly(CoffeeCard.create, {... _.omit(coffeeCardPayload, ['image']), _coffeeImage: 'imageId'});
        });

        it('should return coffeeCard', async () => {
            const result = await coffeeCardService.createCard(coffeeCardPayload);

            assert.deepStrictEqual(result, coffeeCard);
        });
    });
})