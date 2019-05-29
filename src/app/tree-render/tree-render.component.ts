import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeService, Node, Category } from '../tree.service';

@Component({
  selector: 'app-tree-render',
  templateUrl: './tree-render.component.html',
  styleUrls: ['./tree-render.component.css']
})
export class TreeRenderComponent implements OnInit {
  @Input() node: Node;
  @Input() isAuthorized: boolean;
  @Output() onClick = new EventEmitter<Node>(); 
  @Output() onAdd = new EventEmitter<Node>(); 

  constructor(treeService: TreeService) { }

  ngOnInit() {
  }

  onAddNode(node: Node) {
    this.onAdd.emit(node);
  }

  onOpenNode(node: Node) {
    // console.log(node);
    this.onClick.emit(node);
  }

  isCategory(node: Node) {
    return node instanceof Category;
  }

}
