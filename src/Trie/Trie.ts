// src/Trie.js
class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let node = this.root;
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }
  
    search(prefix) {
      let node = this.root;
      for (const char of prefix) {
        if (!node.children[char]) {
          return [];
        }
        node = node.children[char];
      }
      return this._getAllWords(node, prefix);
    }
  
    _getAllWords(node, prefix) {
      const words = [];
      if (node.isEndOfWord) {
        words.push(prefix);
      }
  
      for (const [char, childNode] of Object.entries(node.children)) {
        words.push(...this._getAllWords(childNode, prefix + char));
      }
  
      return words;
    }
  }
  
  export default Trie;
  