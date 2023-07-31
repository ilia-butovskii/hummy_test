const sinon = require("sinon");
const {Test} = require("@nestjs/testing");
const {assert} = require('chai');
const {CACHE_MANAGER} = require("@nestjs/cache-manager");

const {createStubbedModel, createStubbedMongoResponse} = require("../modules/helpers");
const {CoffeeCardService} = require("../../src/modules/coffeCard/CoffeeCardService");
const {getModelToken} = require("../../src/modules/database/ModelsProvider");
const {ESchemaName} = require("../../src/models/schemasMap");
const {CoffeeCardsController} = require("../../src/http/coffeeCards/CoffeeCardsController");
const {CONFIG} = require("../../src/modules/config/tokens");
const {plainToInstance} = require("class-transformer");
const {CoffeeCardResponseDto} = require("../../src/http/coffeeCards/dto/CoffeeCardResponseDto");

describe('Http | coffeeCards | CoffeeCardsController', ()=>{
    const config = {
        http: {
            cacheTtl: 1000,
        }
    }

    let CoffeeCard;
    let cacheManager;
    let coffeeCardService;
    let controller;
    let sandbox;

    beforeEach(async ()=>{
        sandbox = sinon.createSandbox();

        CoffeeCard = createStubbedModel(sandbox);
        cacheManager = {
            get: sandbox.stub().resolves(),
            set: sandbox.stub().resolves(),
        }

        const testModule = await Test.createTestingModule({
            providers: [
                CoffeeCardsController,
                {
                    provide: getModelToken(ESchemaName.CoffeeCard),
                    useValue: CoffeeCard,
                },
                {
                    provide: CoffeeCardService,
                    useValue: sandbox.createStubInstance(CoffeeCardService),
                },
                {
                    provide: CONFIG,
                    useValue: config,
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: cacheManager,
                }
            ],
        }).compile();

        controller = testModule.get(CoffeeCardsController);
        coffeeCardService = testModule.get(CoffeeCardService);
    })

    afterEach(()=>{
        sandbox.restore();
    })

    describe('getLast', ()=>{
        const coffeeCard = {
            _id: 'cardId',
            uid: 'uidTest',
            blendName: 'blendNameTest',
            _coffeeImage: 'imageTest',
            intensifier: 'intensifierTest',
            notes: ['note1', 'note2'],
            origin: 'originTest',
            variety: 'varietyTest',
        }

        beforeEach(()=>{
            const coffeeCardResponseStub = createStubbedMongoResponse(coffeeCard, sandbox);

            CoffeeCard.findOne.returns(coffeeCardResponseStub);
            cacheManager.get.resolves();
        })

        it('should call cacheManager.get with correct params', async ()=>{
            await controller.getLast();

            sandbox.assert.calledOnceWithExactly(cacheManager.get, 'lastCoffeeCard');
        })

        it('should return cache result if exists', async ()=>{
            const cacheResult = {cacheResult: 'cacheResult'};
            cacheManager.get.resolves(cacheResult);

            const result = await controller.getLast();

            assert.deepStrictEqual(result, cacheResult);
        })

        it('should return undefined if card not found', async ()=>{
            CoffeeCard.findOne.returns(createStubbedMongoResponse(null, sandbox));

            const result = await controller.getLast();

            assert.isUndefined(result);
        })

        it('should set to cache formatted card with config ttl', async ()=>{
            const formattedCard = plainToInstance(CoffeeCardResponseDto, coffeeCard);

            await controller.getLast();

            sandbox.assert.calledOnceWithExactly(cacheManager.set, 'lastCoffeeCard', formattedCard,  config.http.cacheTtl);
        })

        it('should return formatted card', async ()=>{
            const result = await controller.getLast();

            assert.deepStrictEqual(result, plainToInstance(CoffeeCardResponseDto, coffeeCard));
        })
    })

    describe('create', ()=>{
        const coffeeCardPayload = {
            _id: 'cardId',
            uid: 'uidTest',
            blendName: 'blendNameTest',
            _coffeeImage: 'imageTest',
            intensifier: 'intensifierTest',
            notes: ['note1', 'note2'],
            origin: 'originTest',
            variety: 'varietyTest',
        }
        const body = {
            test: 'test',
        }

        let coffeeCard;

        beforeEach(()=>{
            coffeeCard = {...coffeeCardPayload, toObject: sandbox.stub().returns(coffeeCardPayload)};

            coffeeCardService.createCard.resolves(coffeeCard);
        })

        it('should call CoffeeCardService.create with correct params', async ()=>{
            await controller.create(body);

            sandbox.assert.calledOnceWithExactly(coffeeCardService.createCard, body);
        })

        it('should cache created card', async ()=>{
            const formattedCard = plainToInstance(CoffeeCardResponseDto, coffeeCardPayload);

            await controller.create(body);

            sandbox.assert.calledOnceWithExactly(cacheManager.set, 'lastCoffeeCard', formattedCard, config.http.cacheTtl);
        })

        it('should return formatted card', async ()=>{
            const result = await controller.create(body);

            assert.deepStrictEqual(result, plainToInstance(CoffeeCardResponseDto, coffeeCardPayload));
        })
    })
})