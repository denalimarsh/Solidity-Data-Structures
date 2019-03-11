pragma solidity 0.4.24;

  /*
   *  @title: StackMapping
   *  @dev: Stack implemented with a mapping.
   */
contract StackMapping {

    uint256 private top;
    mapping(uint256 => uint256) private stack;

    /*
    * @dev: Constructor, initializes top.
    */
    constructor() 
        public
    {
        top = 0;
    }

    /*
    * @dev: Modifier which requires non-empty stack.
    */
    modifier hasContents() {
        require(
            !isEmpty(),
            "The stack is empty."
        );
        _;
    }

    /*
    * @dev: Pushes an item to the top of the stack.
    * @param _data: The data to be pushed to the stack.
    */
    function push(
        uint256 _data
    )
        public
    {
        //Check for integer overflow
        require(
            top + 1 > top,
            "The stack is full."
        );
        
        //Increment top and push to stack
        top++;
        stack[top] = _data;
    }

    /*
    * @dev: Removes top item from the stack.
    * @returns: The data stored at the top of the stack.
    */
    function pop()
        public
        hasContents
        returns(uint256 _data)
    {
        //Store data at top of stack
        uint256 tempData = stack[top];
        
        //Remove and delete data from stack
        delete(stack[top]);
        
        //Decrement top and return stored data
        top--;
        return tempData;
    }

    /*
    * @dev: Checks top item in the stack.
    * @returns: The data stored at the top of the stack.
    */
    function peek()
        public
        view
        hasContents
        returns(uint256 _data)
    {
        return stack[top];
    }
    
    /*
    * @dev: Checks the stack's size.
    * @returns: The size of the stack.
    */   
    function size()
        public
        view
        returns (uint256 _size)
    {
        return top;
    }

    /*
    * @dev: Internal method to check if the stack is empty.
    * @returns: Boolean indicating if the stack is empty.
    */   
    function isEmpty()
        internal
        view
        returns (bool _empty)
    {
        return top == 0;
    }
}