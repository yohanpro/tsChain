import * as CryptoJS from "crypto-js";

class Block {
  static calculateHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  };

  static validateStructure = (aBlock: Block): boolean => {
    if (typeof aBlock.index !== "number") return false;
    if (typeof aBlock.hash !== "string") return false;
    if (typeof aBlock.previousHash !== "string") return false;
    if (typeof aBlock.data !== "string") return false;
    if (typeof aBlock.timestamp !== "number") return false;

    return true;
  };
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

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();

  const newHash: string = Block.calculateHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  return newBlock;
};

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) return false;
  if (previousBlock.index + 1 !== candidateBlock.index) return false;
  if (previousBlock.hash !== candidateBlock.previousHash) return false;

  return true;
};
console.log(createNewBlock("hello"));
console.log(createNewBlock("bye bye"));

export {};
