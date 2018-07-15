const { expect } = require('chai');
const avlTree = require('./index');

describe('avlTree tests', () => {
  const avl = avlTree();

  describe('.insert(value)', () => {
    it('should insert values to the tree and maintain it balanced', () => {
      avl.insert(50);
      avl.insert(80);
      avl.insert(90);
      /*
      verify left rotation
      50  (balance = -2)
       \
        80
         \
          90

       rotates to ==>
        80
       /  \
      50  90
      */
      expect(avl.root().getValue()).to.equal(80);
      expect(avl.root().getRight().getValue()).to.equal(90);
      expect(avl.root().getLeft().getValue()).to.equal(50);


      avl.insert(40);
      avl.insert(30);
      /*
      verify right rotation
                      80
                     /  \
      (balance = 2) 50  90
                   /
                  40
                 /
                30

      rotates to ==>
          80
         /  \
        40  90
       /  \
      30  50
      */
      expect(avl.root().getValue()).to.equal(80);
      expect(avl.root().getRight().getValue()).to.equal(90);
      expect(avl.root().getLeft().getValue()).to.equal(40);
      expect(avl.root().getLeft().getRight().getValue()).to.equal(50);
      expect(avl.root().getLeft().getLeft().getValue()).to.equal(30);

      avl.insert(20);
      /*
      verify right rotation
             80 (balance = 2)
            /  \
           40  90
          /  \
         30  50
        /
       20

       rotates to ==>
           40
          /  \
         30  80
        /   /  \
       20  50  90
      */
      expect(avl.root().getValue()).to.equal(40);
      expect(avl.root().getLeft().getValue()).to.equal(30);
      expect(avl.root().getLeft().getLeft().getValue()).to.equal(20);
      expect(avl.root().getRight().getValue()).to.equal(80);
      expect(avl.root().getRight().getRight().getValue()).to.equal(90);
      expect(avl.root().getRight().getLeft().getValue()).to.equal(50);

      avl.insert(35);
      avl.insert(10);
      avl.insert(15);
      /*
      verify left-right rotation
               40
            /      \
           30      80
          /  \    /  \
         20   35 50  90
        /
       10
        \
        15

      rotates to ==>
               40
            /      \
           30      80
          /  \    /  \
         15   35 50  90
        /  \
       10  20
      */
      expect(avl.root().getValue()).to.equal(40);
      expect(avl.root().getRight().getValue()).to.equal(80);
      expect(avl.root().getRight().getRight().getValue()).to.equal(90);
      expect(avl.root().getRight().getLeft().getValue()).to.equal(50);
      expect(avl.root().getLeft().getValue()).to.equal(30);
      expect(avl.root().getLeft().getRight().getValue()).to.equal(35);
      expect(avl.root().getLeft().getLeft().getValue()).to.equal(15);
      expect(avl.root()
        .getLeft()
        .getLeft()
        .getRight()
        .getValue()).to.equal(20);
      expect(avl.root()
        .getLeft()
        .getLeft()
        .getLeft()
        .getValue()).to.equal(10);

      avl.insert(100);
      avl.insert(95);
      /*
      verify right-left rotation
               40
            /      \
           30      80
          /  \    /  \
         15   35 50  90
        /  \           \
       10  20          100
                      /
                     95

       rotates to ==>
               40
            /      \
           30      80
          /  \    /  \
         15   35 50  95
        /  \        /  \
       10  20      90  100
      */
      expect(avl.root().getValue()).to.equal(40);
      expect(avl.root().getRight().getValue()).to.equal(80);
      expect(avl.root().getRight().getRight().getValue()).to.equal(95);
      expect(avl.root()
        .getRight()
        .getRight()
        .getRight()
        .getValue()).to.equal(100);
      expect(avl.root()
        .getRight()
        .getRight()
        .getLeft()
        .getValue()).to.equal(90);
      expect(avl.root().getRight().getLeft().getValue()).to.equal(50);
      expect(avl.root().getLeft().getValue()).to.equal(30);
      expect(avl.root().getLeft().getRight().getValue()).to.equal(35);
      expect(avl.root().getLeft().getLeft().getValue()).to.equal(15);
      expect(avl.root()
        .getLeft()
        .getLeft()
        .getRight()
        .getValue()).to.equal(20);
      expect(avl.root()
        .getLeft()
        .getLeft()
        .getLeft()
        .getValue()).to.equal(10);
    });
  });


  describe('.min()', () =>
    it('should get the node with min value', () =>
      expect(avl.min().getValue(15))));

  describe('.max()', () =>
    it('should get the node with max value', () =>
      expect(avl.max().getValue(100))));

  describe('.root()', () =>
    it('should get root node', () =>
      expect(avl.root().getValue(40))));

  describe('.find(value)', () =>
    it('should find a value in the tree', () => {
      expect(avl.find(35).getValue()).to.equal(35);
      expect(avl.find(1000)).to.equal(null);
    }));

  describe('.traverse(cb, type)', () => {
    it('should traverse the tree in order', () => {
      const values = [];
      avl.traverse(node => values.push(node.getValue()), 'inOrder');
      expect(values).to.deep.equal([
        10, 15, 20, 30, 35, 40, 50, 80, 90, 95, 100
      ]);
    });

    it('should traverse the tree pre order', () => {
      const values = [];
      avl.traverse(node => values.push(node.getValue()), 'preOrder');
      expect(values).to.deep.equal([
        40, 30, 15, 10, 20, 35, 80, 50, 95, 90, 100
      ]);
    });

    it('should traverse the tree post order', () => {
      const values = [];
      avl.traverse(node => values.push(node.getValue()), 'postOrder');
      expect(values).to.deep.equal([
        10, 20, 15, 35, 30, 50, 90, 100, 95, 80, 40
      ]);
    });

    it('should traverse the tree in order by default', () => {
      const values = [];
      avl.traverse(node => values.push(node.getValue()));
      expect(values).to.deep.equal([
        10, 15, 20, 30, 35, 40, 50, 80, 90, 95, 100
      ]);
    });
  });

  describe('.remove(value)', () => {
    it('should remove values from the tree and maintain it balanced', () => {
      /*
      tree is now like
               40
            /      \
           30      80
          /  \    /  \
         15   35 50  95
        /  \        /  \
       10  20      90  100

       let's remove and verify the auto balancing feature
      */

      avl.remove(35);
      /*
      verify left-right rotation
                         40
                       /    \
      (balance = 2)  30      80
                    /       /  \
                   15      50  95
                  /  \        /  \
                 10  20      90  100

       rotates to ==>
           40
         /     \
        15     80
       /  \   /  \
      10  30 50  95
         /      /  \
        20      90  100
      */
      expect(avl.root().getValue()).to.equal(40);
      expect(avl.root().getRight().getValue()).to.equal(80);
      expect(avl.root().getRight().getRight().getValue()).to.equal(95);
      expect(avl.root()
        .getRight()
        .getRight()
        .getRight()
        .getValue()).to.equal(100);
      expect(avl.root()
        .getRight()
        .getRight()
        .getLeft()
        .getValue()).to.equal(90);
      expect(avl.root().getRight().getLeft().getValue()).to.equal(50);
      expect(avl.root().getLeft().getValue()).to.equal(15);
      expect(avl.root().getLeft().getRight().getValue()).to.equal(30);
      expect(avl.root()
        .getLeft()
        .getRight()
        .getLeft()
        .getValue()).to.equal(20);
      expect(avl.root().getLeft().getLeft().getValue()).to.equal(10);

      avl.remove(10);
      /*
      verify right-left rotation
                          40
                       /      \
      (balance = -2)  15      80
                        \    /  \
                        30  50  95
                       /       /  \
                      20      90  100

       rotates to ==>
           40
         /     \
        20     80
       /  \   /  \
      15  30 50  95
                /  \
               90  100
      */
      expect(avl.root().getValue()).to.equal(40);
      expect(avl.root().getRight().getValue()).to.equal(80);
      expect(avl.root().getRight().getRight().getValue()).to.equal(95);
      expect(avl.root()
        .getRight()
        .getRight()
        .getRight()
        .getValue()).to.equal(100);
      expect(avl.root()
        .getRight()
        .getRight()
        .getLeft()
        .getValue()).to.equal(90);
      expect(avl.root().getRight().getLeft().getValue()).to.equal(50);
      expect(avl.root().getLeft().getValue()).to.equal(20);
      expect(avl.root().getLeft().getRight().getValue()).to.equal(30);
      expect(avl.root().getLeft().getLeft().getValue()).to.equal(15);

      avl.remove(90);
      avl.remove(50);

      /*
      verify left rotation
           40
         /     \
        20     80
       /  \      \
      15  30     95
                   \
                   100

      rotates to ==>
            40
         /      \
        20      95
       /  \    /  \
      15  30  80  100
      */
      expect(avl.root().getValue()).to.equal(40);
      expect(avl.root().getRight().getValue()).to.equal(95);
      expect(avl.root().getRight().getRight().getValue()).to.equal(100);
      expect(avl.root().getRight().getLeft().getValue()).to.equal(80);
      expect(avl.root().getLeft().getValue()).to.equal(20);
      expect(avl.root().getLeft().getRight().getValue()).to.equal(30);
      expect(avl.root().getLeft().getLeft().getValue()).to.equal(15);

      avl.remove(30);
      avl.remove(80);
      avl.remove(100);
      avl.remove(95);
      /*
      verify right rotation
          40
         /
        20
       /
      15

      rotates to ==>
        20
       /  \
      15  40
      */
      avl.remove(20);
      expect(avl.root().getValue()).to.equal(40);
      expect(avl.root().getLeft().getValue()).to.equal(15);
      avl.remove(40);
      expect(avl.root().getValue()).to.equal(15);
      expect(avl.count()).to.equal(1);
      avl.insert(20);
      avl.remove(15);
      expect(avl.root().getValue()).to.equal(20);
      expect(avl.count()).to.equal(1);
      avl.remove(20);
      expect(avl.root()).to.equal(null);
      expect(avl.count()).to.equal(0);
    });
  });

  describe('.clear()', () => {
    avl.clear();
    expect(avl.count()).to.equal(0);
    expect(avl.root()).to.equal(null);
    expect(avl.remove(10)).to.equal(undefined);
  });
});
