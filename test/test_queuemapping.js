const QueueMapping = artifacts.require('QueueMapping');

const EVMRevert = 'revert';
const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('QueueMapping', function (accounts) {

  describe('QueueMapping contract deployment', function() {

    beforeEach(async function() {
      this.queue = await QueueMapping.new();
    });

    it('should correctly deploy the queue contract', async function () {
      this.queue.should.exist;
    });

    it('should initialize queue size to 0', async function () {
      const size = await this.queue.size().should.be.fulfilled;
      size.should.be.bignumber.equal(0);
    });

  });

  describe('Adding items to the queue', function() {

    beforeEach(async function() {
      this.queue = await QueueMapping.new();
      this.items = [11, 22, 33, 44];
    });

 
    it('should allow items to be added to the queue', async function () {
      await this.queue.enqueue(this.items[0]).should.be.fulfilled;
    });

    it('should allow multiple items to be added to the queue', async function () {
      for(var i = 0; i < this.items.length; i++) {
        await this.queue.enqueue(this.items[i]).should.be.fulfilled;
      }
    });

  });

  describe('Viewing queue\'s contents', function() {

    describe('Empty queue', function() {

       beforeEach(async function() {
        this.queue = await QueueMapping.new();
        this.items = [11, 22, 33, 44];
      });

      it('should not allow access to the front while the queue is empty', async function () {
        await this.queue.viewFront().should.be.rejectedWith(EVMRevert);
      });
   
      it('should not allow access to the back while the queue is empty', async function () {
        await this.queue.viewBack().should.be.rejectedWith(EVMRevert);
      });

    });

    describe('Populated queue', function() {

       beforeEach(async function() {
        this.queue = await QueueMapping.new();
        this.items = [11, 22, 33, 44];

        //Enqueue items
        for(var i = 0; i < this.items.length; i++) {
          await this.queue.enqueue(this.items[i]).should.be.fulfilled;
        }

        //Confirm that the queue has been populated
        const size = await this.queue.size();
        size.should.be.bignumber.equal(this.items.length);
      });

      it('should allow access to the front of the queue', async function () {
        await this.queue.viewFront().should.be.fulfilled;
      });   

      it('should allow access to the back of the queue', async function () {
        await this.queue.viewBack().should.be.fulfilled;
      });

      it('should correctly return the front\'s data', async function () {
        const front = await this.queue.viewFront.call();
        front.should.be.bignumber.equal(this.items[0]);
      });

      it('should correctly return the back\'s data', async function () {
        const back = await this.queue.viewBack.call();
        back.should.be.bignumber.equal(this.items[this.items.length - 1]);
      });

    });

  });

  describe('Queue sizing', function() {

     beforeEach(async function() {
      this.queue = await QueueMapping.new();
      this.items = [11, 22, 33, 44];

      //Enqueue items
      for(var i = 0; i < this.items.length; i++) {
        await this.queue.enqueue(this.items[i]).should.be.fulfilled;
      }

    });

    it('should correctly increment queue size', async function () {
      //Check the queue's current size
      const size = await this.queue.size();
      size.should.be.bignumber.equal(this.items.length);

      await this.queue.enqueue(this.items[0]);

      const finalSize = await this.queue.size();
      finalSize.should.be.bignumber.equal(Number(this.items.length + 1));  
    });

    it('should correctly decrement queue size', async function () {
      //Check the queue's current size
      const size = await this.queue.size();
      size.should.be.bignumber.equal(this.items.length);

      await this.queue.dequeue.call();

      //Check that queue's size has decreased
      const finalSize = await this.queue.size();
      finalSize.should.be.bignumber.equal(this.items.length);  
    });

  });

  describe('Removing items from the queue', function() {

    describe('Empty queue', function() {

       beforeEach(async function() {
        this.queue = await QueueMapping.new();
      });

      it('should not allow dequeuing if the queue is empty', async function () {
        //Confirm that dequeue throws an error
        await this.queue.dequeue().should.be.rejectedWith(EVMRevert);
      });

    });

    describe('Popoulated queue', function() {

       beforeEach(async function() {
        this.queue = await QueueMapping.new();
        this.items = [11, 22, 33, 44];

        //Enqueue items
        for(var i = 0; i < this.items.length; i++) {
          await this.queue.enqueue(this.items[i]).should.be.fulfilled;
        }
      });

      it('should allow the back of the queue to be dequeued', async function () {
        await this.queue.dequeue().should.be.fulfilled;
      });

      it('should return the correct value from the front of the queue', async function () {
        const item = await this.queue.dequeue.call();
        item.should.be.bignumber.equal(this.items[0]);
      });

      it('should allow multiple successive dequeues', async function () {
        for(var i = 0; i < this.items.length; i++) {
          await this.queue.dequeue().should.be.fulfilled;
        }
      });

      it('should correctly return the front of queue for each item in the list', async function () {
        for(var i = 0; i < this.items.length; i++) {
          //Get expected value to be returned with dequeue.call()
          const item = await this.queue.dequeue.call();
          //Dequeue item with dequeue()
          await this.queue.dequeue().should.be.fulfilled;

          //Confirm that the dequeued item is expected value
          item.should.be.bignumber.equal(this.items[i]);
        }
      });

    });

  });

});