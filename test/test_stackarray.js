const StackArray = artifacts.require('StackArray');

const EVMRevert = 'revert';
const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('StackArray', function (accounts) {

  describe('StackArray contract deployment', function() {

    beforeEach(async function() {
      this.stack = await StackArray.new();
    });

    it('should correctly deploy the stack contract', async function () {
      this.stack.should.exist;
    });

    it('should initialize stack size to 0', async function () {
      const size = await this.stack.size().should.be.fulfilled;
      size.should.be.bignumber.equal(0);
    });

  });

  describe('Pushing to the stack', function() {

    beforeEach(async function() {
      this.stack = await StackArray.new();
      this.items = [11, 22, 33, 44];
    });

 
    it('should allow items to be pushed to the stack', async function () {
      await this.stack.push(this.items[0]).should.be.fulfilled;
    });

    it('should correctly increment stack size on push', async function () {
      //Push an item to the stack
      await this.stack.push(this.items[0]);

      //Confirm that the size has increased
      const size = await this.stack.size();
      size.should.be.bignumber.equal(1);
    });

    it('should allow multiple items to be pushed to the stack', async function () {
      for(var i = 0; i < this.items.length; i++) {
        await this.stack.push(this.items[i]).should.be.fulfilled;
      }
    });

    it('should correctly increment stack size on push of multiple items', async function () {
      for(var i = 0; i < this.items.length; i++) {
        await this.stack.push(this.items[i]);
      }

      //Confirm that the size has increased as expected
      const size = await this.stack.size();
      size.should.be.bignumber.equal(this.items.length);
    });

  });

  describe('Peeking at the top of stack', function() {

    beforeEach(async function() {
      this.stack = await StackArray.new();
      this.items = [11, 22, 33, 44];
    });

    it('should not allow items to be viewed if the stack is empty', async function () {
      //Check that the stack is empty
      const size = await this.stack.size();
      size.should.be.bignumber.equal(0);

      //Attempt to view the top of the stack
      await this.stack.peek().should.be.rejectedWith(EVMRevert);
    });

    it('should allow the top of stack to be viewed', async function () {
      //Push an item to the stack
      await this.stack.push(this.items[0]);

      //Attempt to view the top of the stack
      await this.stack.peek().should.be.fulfilled;
    });

    it('should correctly return the value stored at the top of the stack', async function () {
      //Push an item to the stack
      await this.stack.push(this.items[0]);

      //Confirm that the correct item is viewed
      const item = await this.stack.peek();
      item.should.be.bignumber.equal(this.items[0]);
    });

    it('should return the correct value when multiple items are on the stack', async function () {
      //Push multiple items to the stack
      for(var i = 0; i < this.items.length; i++) {
        await this.stack.push(this.items[i]);
      }

      //Confirm that the correct item is viewed
      const item = await this.stack.peek();
      item.should.be.bignumber.equal(this.items[this.items.length - 1]);
    });

  });

  describe('Popping from the stack', function() {

    beforeEach(async function() {
      this.stack = await StackArray.new();
      this.items = [11, 22, 33, 44];
    });

    it('should not allow items to be popped if the stack is empty', async function () {
      //Check that the stack is empty
      const size = await this.stack.size();
      size.should.be.bignumber.equal(0);

      //Attempt to pop non-existent item from the stack
      await this.stack.pop().should.be.rejectedWith(EVMRevert);
    });

    it('should allow items to be popped from the stack', async function () {
      //Push an item to the stack
      await this.stack.push(this.items[0]);

      //Attempt to pop an item from the stack
      await this.stack.pop().should.be.fulfilled;
    });

    it('should pop the value stored at the top of the stack', async function () {
      //Push an item to the stack
      await this.stack.push(this.items[0]);

      //Get the expected returned value with pop.call()
      const item = await this.stack.pop.call();
      //Confirm that the value is correct
      item.should.be.bignumber.equal(this.items[0]);
    });

    it('should pop the correct value when multiple items are on the stack', async function () {
      //Push multiple items to the stack
      for(var i = 0; i < this.items.length; i++) {
        await this.stack.push(this.items[i]);
      }

      //Get the expected returned value with pop.call()
      const item = await this.stack.pop.call();
      //Confirm that the value is correct
      item.should.be.bignumber.equal(this.items[this.items.length - 1]);
    });

    it('should allow multiple items to be popped from the stack', async function () {
      //Push multiple items to stack
      for(var i = 0; i < this.items.length; i++) {
        await this.stack.push(this.items[i]);
      }

      //Confirm that the stack size has increased
      const size = await this.stack.size();
      size.should.be.bignumber.equal(this.items.length);

      //Pop multiple items from stack
      for(var i = 0; i < this.items.length; i++) {
        await this.stack.pop().should.be.fulfilled;
      }

      //Confirm that the stack size has decreased
      const finalSize = await this.stack.size();
      finalSize.should.be.bignumber.equal(0);
    });

    it('should pop the correct value each time when multiple items are popped', async function () {
      //Push multiple items to stack
      for(var i = 0; i < this.items.length; i++) {
        await this.stack.push(this.items[i]);
      }

      //Confirm that the stack size has increased
      const size = await this.stack.size();
      size.should.be.bignumber.equal(this.items.length);

      for(var i = this.items.length - 1; i >= 0; i--) {
        //Check the expected return value with pop.call()
        const item = await this.stack.pop.call();
        //Pop item from the stack with pop()
        await this.stack.pop().should.be.fulfilled;

        //Confirm that the correct value has been popped each time
        item.should.be.bignumber.equal(this.items[i]);
      }
    });

  });

});