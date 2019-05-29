import { Component, NgModule } from '@angular/core';
import { Tree, TreeService, Node, Book, Category } from './tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bookTree: Tree;
  openedNode: Node;
  isAuthorized: boolean = false;
  isOpenedAdd = false;
  parentNode: Node;
  authButtonLabel = "Войти";

  constructor(private treeService: TreeService) {

  }

  ngOnInit(): void {
    this.bookTree = this.treeService.tree;
  }

  onOpenNode(node: Node) {
    this.openedNode = node;
    this.isOpenedAdd = false;
  }

  onOpenAdd(parentNode: Node) {
    this.isOpenedAdd = true;
    this.parentNode = parentNode;
  }

  auth() {
    this.isAuthorized=!this.isAuthorized;
    if (this.isAuthorized) {
      this.authButtonLabel = "Выйти";
    } else {
      this.authButtonLabel = "Войти";
      this.isOpenedAdd = false;
    }
  }

  isNotJustNode(node: Node) {
    return (this.openedNode instanceof Book) || (this.openedNode instanceof Category);
  }
}
