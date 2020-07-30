class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.hash = hash;
    this.timestamp = timestamp;
  }
}
const genesisBlock: Block = new Block(0, "abcd02", "", "hi", 123456);

let blockChain: [Block] = [genesisBlock];
