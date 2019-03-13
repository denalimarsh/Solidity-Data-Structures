pragma solidity 0.4.24;

  /*
   *  @title: StackArray
   *  @dev: Stack implemented with a dynamically sized array.
   */
contract StackArray {

    uint256[] private stack;

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
    * @dev: Pushes an item to the stack.
    * @param _data: The data to be pushed to the stack.
    */
    function push(uint256 _data)
        public
    {
        require(
            size() + 1 > size(),
            "The stack is full."
        );

        stack.push(_data);
    }

    /*
    * @dev: Removes top item from the stack.
    * @returns _data: The data popped from the stack.
    */
    function pop()
        public
        hasContents()
        returns(uint256 _data)
    {   
        //Store data at top of stack for return
        uint256 tempData = stack[size() - 1];
        
        //Remove data from stack
        stack.length--;
        
        //Return stored data
        return tempData;
    }

    /*
    * @dev: Checks top item in the stack.
    * @returns _data: The data located at the top of the stack.
    */
    function peek()
        public
        view
        hasContents()
        returns(uint256 _data)
    {
        return stack[size() - 1];
    }
    
    /*
    * @dev: Checks the stack's size.
    * @returns _size: The size of the stack.
    */   
    function size()
        public
        view
        returns (uint256 _size)
    {
        return stack.length;
    }

    /*
    * @dev: Internal helper method to check if the stack is empty.
    * @returns _empty: Boolean indicating if the stack is empty.
    */   
    function isEmpty()
        internal
        view
        returns (bool _empty)
    {
        return stack.length == 0;
    }
}