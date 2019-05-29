import { Injectable } from '@angular/core';

function getId() {
  let id = 0;
  return function () {
    return id++;
  }
}

const counter = getId();

export class Tree {
  public root: Node;
  ;

  constructor(root: Node) {
    this.root = root;
  }

  add(toNode: Node, node: Node) {
    toNode.children.push(node);
    node.parent = toNode;
  }

  remove(node: Node) {
    node.parent.children.splice(node.parent.children.indexOf(node), 1);
    node.parent = null;
  }

  search(node: Node, callback) {
    if (node.children.length <= 0) {
      callback(node);
    } else {
      for (let child of node.children) {
        this.search(child, callback);
      }
      callback(node);
    }
  }

  getAuthors(fromNode: Node) {
    const authors = new Set();
    function findAuthors(node: Node) {
      if (node instanceof Book) {
        authors.add(node.author);
      }
    }
    this.search(fromNode, findAuthors);
    return authors;
  }
}

export class Node {
  parent: Node = null;
  children: Node[] = [];
  isActive: boolean = false;

  setActive() {
    this.isActive = true;
  }

  setInactive() {
    this.isActive = false;
  }
}

export class Book extends Node {
  ISBN: number;
  author: string;
  name: string;
  shortdescription: string;

  constructor(ISBN: number, author: string, name: string, shortdescription: string) {
    super();
    this.ISBN = ISBN;
    this.author = author;
    this.name = name;
    this.shortdescription = shortdescription;
  }

  getData(): any[] {
    return [this.ISBN, this.author, this.name];
  }

  getType() {
    return 'Книга';
  }
}

export class Category extends Node {
  id: number;
  name: string;


  constructor(name: string) {
    super();
    this.id = counter();
    this.name = name;
  }
  getData(): any[] {
    return [this.name]
  }

  getType() {
    return 'Категория';
  }
}

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  counter = getId();
  tree: Tree = new Tree(new Category('Книги'));

  constructor() {
    this.tree.add(this.tree.root, new Category('Роман'))
    this.tree.add(this.tree.root, new Category('Поэма'))
    this.tree.add(this.tree.root, new Category('Рассказ'))
    this.tree.add(this.tree.root, new Category('Научная литература'))
    this.tree.add(this.tree.root.children[0], new Book(9747694759433, 'Лев Толстой',
      'Война и Мир', 'Очень большая книга о войне и мире'))
    this.tree.add(this.tree.root.children[1],
      new Book(1213141516333, 'Александр Сергеевич Пушкин', 'Гаврилиада', 'Не о Гавриле'))
    this.tree.add(this.tree.root.children[2], new Category('Юмористические'))
    this.tree.add(this.tree.root.children[3], new Category('История'))
    this.tree.add(this.tree.root.children[3], new Category('Программирование'))
    this.tree.add(this.tree.root.children[3].children[0], new Category('Детская литература'))
    this.tree.add(this.tree.root.children[3].children[0].children[0], new Category('Былины'))
    this.tree.add(this.tree.root.children[3].children[0].children[0].children[0],
      new Book(1235123141231, "Русский народ", "Илья Муромец и Соловей Разбойник",
        'В том ли в городе во Муроме, в том ли в селе Карачарове жила-была семья. И росло в той семье чадо милое - Ильюшенька сын Иванович.'))
  }
}
