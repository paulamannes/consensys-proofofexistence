const IpfsStorage = artifacts.require('IpfsStorage');
const should = require('chai').should();
const assertRevert = require('./helpers/assertRevert');

contract('IpfsStorage', async (accounts) => {

    let fileName = "unique_onemilliondollar_picture.jpg";
    let ipfsHash = "QmciPjh2KS846wNGFja3kstXo7quAoybhr1WqTtvahUpFC";
    let tags = "photography nature travel";

    let fileName2 = "another_unique_onemilliondollar_picture.jpg";
    let ipfsHash2 = "QmPSxgC489JCUtsqkiGgFyxRGwdo67mFHA5kKiaenrEJcQ";
    let tags2 = "photography nature travel2";

    describe("File Input/Ouput Expected", async () => {
        beforeEach(async function () {
           this.ipfsStorage = await IpfsStorage.new({from: accounts[0]});
        });        

        it('should files for account be empty', async function () {            
            let fileIndexes = await this.ipfsStorage.getFileIndexes({from: accounts[0]});              
            should.not.equal([0],fileIndexes);
        });

        it('should store and retrive file data', async function () {
            let tx = await this.ipfsStorage.insertFile(fileName, ipfsHash, tags, {from: accounts[0]});
            should.exist(tx);
            
            let fileIndexes = await this.ipfsStorage.getFileIndexes({from: accounts[0]});              
            should.exist(fileIndexes);
            
            let owner = await this.ipfsStorage.fileOwner.call(0);
            should.equal(accounts[0], owner);

            let fileData = await this.ipfsStorage.getFile(0, {from: accounts[0]});
            should.equal(fileName, fileData[0]);
            should.equal(ipfsHash, fileData[1]);
            should.equal(tags, fileData[2]);
            should.exist(fileData[3]); //timestamp            
        });

        it('should the owner be same as account[0]', async function () {
            await this.ipfsStorage.insertFile(fileName, ipfsHash, tags, {from: accounts[0]});
                
            let owner = await this.ipfsStorage.fileOwner.call(0);
            should.equal(accounts[0], owner);
        });

        it('should the file index 1 be the same as the second added', async function () {
            await this.ipfsStorage.insertFile(fileName, ipfsHash, tags, {from: accounts[0]});
            await this.ipfsStorage.insertFile(fileName2, ipfsHash2, tags2, {from: accounts[0]});
                
            let fileData = await this.ipfsStorage.getFile(1, {from: accounts[0]});
            should.equal(fileName2, fileData[0]);
            should.equal(ipfsHash2, fileData[1]);
            should.equal(tags2, fileData[2]);
            should.exist(fileData[3]); //timestamp
        });
    });

    describe('Input Validation', function() {
        beforeEach(async function () {
           this.ipfsStorage = await IpfsStorage.new({from: accounts[0]});
        });

        it("should process input equal or lower than the size limit", async function() {
            let result = await this.ipfsStorage.insertFile(fileName, ipfsHash, tags, {from: accounts[0]});
            should.exist(result);
        });

        it("should not process input equal or bigger than the size limit", async function() {
            try
            {                
                await this.ipfsStorage.insertFile("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                ipfsHash, tags, {from: accounts[0]});            
                
                assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
                assertRevert(error);
            }
        });
    });    

    describe('Stop Execution', function() {
        beforeEach(async function () {
           this.ipfsStorage = await IpfsStorage.new({from: accounts[0]});
        });

        it("should not allow get file from different account", async function() {
            try
            {  
                await this.ipfsStorage.insertFile(fileName, ipfsHash, tags, {from: accounts[0]});
                await this.ipfsStorage.getFile(1, {from: accounts[1]});
                assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
                assertRevert(error);
            }
        });
    });
})