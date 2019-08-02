const assert = require('chai').assert;
const app = require('./testFeature')

describe('testing feature 1', () => {
    it('the function should return hello',()=>{
        assert.equal(app(),'hello')
    })
})
