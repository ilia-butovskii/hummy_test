const sinon = require('sinon');
const { Test } = require('@nestjs/testing');
const _ = require('lodash');
const {assert} = require('chai');

const { createStubbedModel } = require('../helpers');
const { LogService } = require('../../../src/modules/log/LogService');
const { getModelToken } = require('../../../src/modules/database/ModelsProvider');
const { ESchemaName } = require('../../../src/models/schemasMap');

describe ('Modules | Log | LogService', () => {
    let AccessLog;
    let logService;
    let sandbox;

    beforeEach(async () => {
        sandbox = sinon.createSandbox();

        AccessLog = createStubbedModel(sandbox);

        const testModule = await Test.createTestingModule({
            providers: [
                LogService,
                {
                    provide: getModelToken(ESchemaName.AccessLog),
                    useValue: AccessLog,
                },
            ],
        }).compile();

        logService = testModule.get(LogService);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('accessLog', ()=>{
        const userAgent = 'userAgent'
        const responseTime = 10
        const requestDateTime = new Date();
        const responseDateTime = new Date(requestDateTime.getTime() + 10);

        const req = {
            path: 'testPath',
            method: 'GET',
            socket: {
                remoteAddress: 'test.test'
            },
        }
        const res = {
            statusCode: 200,
        }

        beforeEach(()=>{
            req.header = sandbox.stub();
            req.header.withArgs('user-agent').returns(userAgent)
            req.header.withArgs('x-forwarded-for').returns(undefined);

            AccessLog.create.resolves();
        })

        it('should call AccessLog.create with args', async()=>{
            const expectedArg = {
                dateTime: responseDateTime,
                responseTime,
                ip: req.socket.remoteAddress,
                path: req.path,
                userAgent: userAgent,
                responseStatus: res.statusCode,
                method: req.method,
            }

            await logService.accessLog({
                responseTime: responseDateTime,
                requestTime: requestDateTime,
                res,
                req,
            })

            sandbox.assert.calledOnceWithExactly(AccessLog.create, expectedArg);
        })
    })
})