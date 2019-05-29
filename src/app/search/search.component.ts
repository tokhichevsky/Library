import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Tree, Node, Book, Category, TreeService } from '../tree.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  bookTree: Tree;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  nodeCtrl = new FormControl();
  filteredAuthors: Set<string> = new Set();
  selectedAuthors: Set<string> = new Set();
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @Output() onEqual = new EventEmitter<Node>();

  constructor(private treeService: TreeService) {}

  select(author: string) {
    this.selectedAuthors.add(author);
  }

  remove(author: string) {
    this.selectedAuthors.delete(author)
  }

  globalFilter(value: string): string[] {
    let result = [];
    const selectedAuthors = this.selectedAuthors;
    const bookTree = this.bookTree;
    const equalEvent = this.onEqual;

    value = value.trim().toLowerCase();

    function checkAuthors(selectedAuthors: Set<string>, foundAuthors: Set<string>) {
      let result = false;

      selectedAuthors.forEach((author) => {
        if (foundAuthors.has(author))
          result = true;
      })

      return result;
    }

    function checkFields(node: Node) {
      if (node instanceof Book && value) {
        if (node.author.toLowerCase().includes(value)) {
          result.push(node.author);
        }
        if (String(node.ISBN) === value) {
          equalEvent.emit(node);
        }
      }
      if (node instanceof Book || node instanceof Category) {
        const data = node.getData();

        node.setInactive();
        if (checkAuthors(selectedAuthors, bookTree.getAuthors(node)) || selectedAuthors.size === 0)
          for (let el of data) {
            if (String(el).toLowerCase().includes(value)) {
              node.setActive();
              break;
            }
          }
      }
    }

    if (value.length > 0 || selectedAuthors.size > 0) {
      this.bookTree.search(this.bookTree.root, checkFields)
    } else {
      this.bookTree.search(this.bookTree.root, (node) => node.setInactive())
    }
    return result;
  }

  onInput(event: any) {
    this.filteredAuthors = new Set(this.globalFilter(event.originalTarget.value));
  }

  onChange(value: string) {
    this.filteredAuthors = new Set(this.globalFilter(value));
  }

  clearInput(input: any) {
    input.value = '';
    input.focus();
    this.onChange('');
  }

  clearSelect() {
    this.selectedAuthors = new Set();
  }

  ngOnInit() {
    this.bookTree = this.treeService.tree;
  }

}
