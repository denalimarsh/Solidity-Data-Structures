# Solidity Data Structures

A collection of common data structures implemented in Solidity using the Truffle Suite.

## Considerations

As high gas costs can be incurred when iterating over collections of elements, care has been taken to minimize item iteration where possible. Due to privacy concerns and in accordance with OOD principles, only the core functionality is exposed while underlying mechanisms are hidden through the use of `private` and `internal` modifiers.


## Testing

Each data structure is accompanied by a comprehensive JavaScript test suite. To run the tests, follow these steps:

1. Install packages: `npm install`
2. Start the truffle environment: `truffle develop`
3. In another tab, run tests: `truffle test`

WARNING: These contracts have not undergone an external audit, use them at your own risk.

## Future Work

This project is in active development.

We're working on:
- HashMap supporting key iteration
- Stack (with dynamically sized array)
- Queue (with dynamically sized array)
- Linked List, Doubly Linked List, Circular Linked List
- Binary Search Tree, Red-Black Tree
- Minimum Heap, Maximum Heap
- Graphs (with adjacency list)

## Contributors

The author welcomes pull requests, feature requests, testing assistance and feedback.

## License

This project is licensed under the MIT License.

