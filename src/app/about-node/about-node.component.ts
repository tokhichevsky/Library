import { Component, OnInit, Input } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Book, Node, Category, TreeService, Tree } from '../tree.service';

@Component({
  selector: 'app-about-node',
  templateUrl: './about-node.component.html',
  styleUrls: ['./about-node.component.css']
})
export class AboutNodeComponent implements OnInit {
  @Input() node: Node;
  @Input() isAuthorized: boolean;

  bookTree: Tree;

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.bookTree = this.treeService.tree;
  }

  isBook(node: Node) {
    return node instanceof Book;
  }

  isCategory(node: Node) {
    return node instanceof Category;
  }

  removeNode(node: Node) {
    this.bookTree.remove(node);
  }
}
