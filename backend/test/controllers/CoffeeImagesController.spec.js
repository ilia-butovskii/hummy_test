const sinon = require("sinon");
const {createStubbedModel, createStubbedMongoResponse} = require("../modules/helpers");
const {Test} = require("@nestjs/testing");
const {assert} = require('chai');


const {getModelToken} = require("../../src/modules/database/ModelsProvider");
const {ESchemaName} = require("../../src/models/schemasMap");
const {CoffeeCardService} = require("../../src/modules/coffeCard/CoffeeCardService");
const {CONFIG} = require("../../src/modules/config/tokens");
const {CACHE_MANAGER} = require("@nestjs/cache-manager");
const {CoffeeImagesController} = require("../../src/http/coffeeImages/CoffeeImagesController");
const {CoffeeImageResponseDto} = require("../../src/http/coffeeImages/dto/CoffeeImageResponseDto");
const {plainToInstance} = require("class-transformer");

describe.only('Http | coffeeCards | CoffeeImagesController', ()=> {
    const config = {
        http: {
            cacheTtl: 1000,
        }
    }
    const CACHE_PREFIX = 'coffeeImages';

    let CoffeeImage;
    let cacheManager;
    let coffeeCardService;
    let controller;
    let sandbox;

    beforeEach(async () => {
        sandbox = sinon.createSandbox();

        CoffeeImage = createStubbedModel(sandbox);
        cacheManager = {
            get: sandbox.stub().resolves(),
            set: sandbox.stub().resolves(),
        }

        const testModule = await Test.createTestingModule({
            providers: [
                CoffeeImagesController,
                {
                    provide: getModelToken(ESchemaName.CoffeeImage),
                    useValue: CoffeeImage,
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

        controller = testModule.get(CoffeeImagesController);
        coffeeCardService = testModule.get(CoffeeCardService);

        sandbox.stub(controller, 'CACHE_PREFIX').value(CACHE_PREFIX);
    })

    afterEach(() => {
        sandbox.restore();
    })

    describe('getImageById', () => {
        const id = 'testId';
        const imagePayload = {
            src: 'testSrc',
        }
        const cachedImage = {
            src: 'cachedSrc',
        }

        let image;

        beforeEach(() => {
            image = createStubbedMongoResponse(imagePayload, sandbox);

            CoffeeImage.findById.withArgs(id).returns(image);
            cacheManager.get.withArgs(`${CACHE_PREFIX}_${id}`).resolves(undefined);
        });

        it('should return image from cache if it exists', async () => {
            cacheManager.get.withArgs(`${CACHE_PREFIX}_${id}`).resolves(cachedImage);

            const result = await controller.getImageById(id);

            assert.deepStrictEqual(result, cachedImage);
        });

        it('should set to cache image if it does not exist', async () => {
            const expectedImage = plainToInstance(CoffeeImageResponseDto, imagePayload);

            await controller.getImageById(id);

            sandbox.assert.calledOnceWithExactly(cacheManager.set, `${CACHE_PREFIX}_${id}`, expectedImage, config.http.cacheTtl);
        });

        it('should return image from db if it does not exist in cache', async () => {
            const expectedImage = plainToInstance(CoffeeImageResponseDto, imagePayload);

            const result = await controller.getImageById(id);

            assert.deepStrictEqual(result, expectedImage);
        });
    })
});