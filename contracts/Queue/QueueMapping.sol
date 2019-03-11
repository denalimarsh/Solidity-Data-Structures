pragma solidity 0.4.24;

  /*
   *  @title: QueueMapping
   *  @dev: Queue implemented with a mapping.
   */
contract QueueMapping {

    uint256 private front;
    uint256 private back;
    mapping(uint256 => uint256) private queue;

    /*
    * @dev: Constructor, initializes front and back.
    */
    constructor() 
        public
    {
        front = 1;
        back = 0;
    }

    /*
    * @dev: Modifier which requires non-empty queue.
    */
    modifier hasContents() {
        require(
            !isEmpty(),
            "The queue is empty."
        );
        _;
    }

    /*
    * @dev: Adds an item to the back of the queue.
    * @param _data: Data to be added to the queue.
    */
    function enqueue(
        uint256 _data
    )
        public
    {
        require(
            back + 1 > back,
            "The queue is full."
        );
        //Increment back and set data
        back++;
        queue[back] = _data;
    }

    /*
    * @dev: Removes an item from the front of the queue.
    * @returns: The data stored at the front of the queue.
    */
    function dequeue()
        public
        hasContents
        returns(uint256 _data)
    {
        //Temporarily store data located at front of the queue
        uint256 data = queue[front];

        //Remove data from queue
        delete(queue[front]);

        //Increment front and return data
        front++;
        return data;
    }

    /*
    * @dev: Checks the first item in the queue.
    * @returns: The data stored at the front of the queue.
    */
    function viewFront()
        public
        view
        hasContents
        returns(uint256)
    {
        return queue[front];
    }

    /*
    * @dev: Checks the last item in the queue.
    * @returns: The data stored at the back of the queue.
    */
    function viewBack()
        public
        view
        hasContents
        returns(uint256)
    {
        return queue[back];
    }

    /*
    * @dev: Gets the size of the queue.
    * @returns: The size of the queue.
    */
    function size()
        public
        view
        returns(uint256)
    {
        return (back - front + 1);
    }

    /*
    * @dev: Internal method to check if the queue is empty.
    * @returns: Boolean indicating if the queue is empty.
    */
    function isEmpty()
        internal
        view
        returns(bool)
    {
        return (size() == 0);
    }
}