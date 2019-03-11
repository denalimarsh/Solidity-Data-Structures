# Solidity Data Structures

A collection of common data structures implemented in Solidity, organized and tested using Truffle Suite.

The motivation of this project is to provide secure, optimized, extensible data structures for use in smart contract systems. Where possible, the data structures have been implemented with different underlying storage mechanisms (dynamically sized array, mapping, etc.) to showcase various implementation strategies.

## Development Status

This project is in active development.
Data structures must pass a comprehensive JavaScript test suite to be considered 'completed'.

Completed:
- StackMapping: Stack backed by a mapping.
- QueueMapping: Queue backed by a mapping.

In development:
- StackArray: Stack backed by a dynamically sized array.
- QueueArray: Queue backed by a dynamically sized array.
- HashMap: Mapping structure supporting key iteration.
- LinkedList: Native implementation.
- DoublyLinkedList: Doubly Linked List backed by a dynamically sized array.
- Circular Linked List: Native implementation.

Future work:
- Binary Search Tree
- Red-Black Tree
- Minimum Heap, Maximum Heap
- GraphAdjList: Graph backed by an adjacency list.

## Considerations

- As high gas costs can be incurred when iterating over collections of elements, care has been taken to minimize item iteration where possible.
- Due to privacy concerns and in accordance with OOD principles, only the core functionality is exposed while underlying mechanisms are hidden through the use of `private` and `internal` modifiers.


## Testing

Each data structure is accompanied by an associated test suite. To run the tests, follow these steps:

1. Install packages: `npm install`
2. Start the truffle environment: `truffle develop`
3. In another tab, run tests: `truffle test`

WARNING: These contracts have not undergone an external audit, use them at your own risk.

## Contributors

The author welcomes pull requests, feature requests, testing assistance and feedback.

## License

This project is licensed under the MIT License.

