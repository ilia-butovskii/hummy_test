const createStubbedModel = (sandbox) => {
    return {
        create: sandbox.stub(),
        find: sandbox.stub(),
        findOne: sandbox.stub(),
        findById: sandbox.stub(),
    }
}

const createStubbedMongoResponse = (value, sandbox)=>{
    const leanStub = sandbox.stub().returns({exec: sandbox.stub().resolves(value)});
    return {
        exec: sandbox.stub().resolves(value),
        sort: sandbox.stub().returns({lean: leanStub}),
        lean: leanStub,
    }
}

module.exports = {
    createStubbedModel,
    createStubbedMongoResponse
}