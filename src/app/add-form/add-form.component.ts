import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Node, Tree, TreeService, Book, Category} from '../tree.service'
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  @Input() parentNode: Node;
  bookTree: Tree;
  nodeTypes: string[] = ['Произведение', 'Категория'];
  selectedType: string = this.nodeTypes[0];

  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.bookTree = this.treeService.tree;
  }

  addBook(ISBN: string, author: string, name: string, shortdescription: string) {
    if (ISBN.length && ISBN.match(/\d{13}/).length && author.length && name.length && shortdescription.length) {
      this.bookTree.add(this.parentNode, new Book(Number(ISBN), author, name, shortdescription));
    }
  }

  addCategory(name: string) {
    if (name.length) {
      this.bookTree.add(this.parentNode, new Category(name));
    }
  }

  clearInputs(inputs: HTMLInputElement[]) {
    console.log(inputs[0])
    for (let input of inputs) {
      input.value = '';
    }
  }

}
