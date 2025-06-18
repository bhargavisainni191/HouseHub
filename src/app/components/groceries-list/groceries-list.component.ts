import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groceries-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './groceries-list.component.html',
})
export class GroceriesListComponent implements OnInit {
  items: Item[] = [];
  newItemName: string = '';
  newItemQuantity: number | null = null;
  editIndex: number | null = null;
  mode: 'edit' | 'shopping' = 'edit';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((listOfItems) => {
      this.items = listOfItems;
    });
  }

  toggleMode() {
    this.mode = this.mode === 'edit' ? 'shopping' : 'edit';
  }

  addItem() {
    const quantity = this.newItemQuantity ?? 1;
    const item = {
      name: this.newItemName,
      quantity: quantity,
    };

    if (this.editIndex !== null) {
      const currentItem = this.items[this.editIndex];
      if (currentItem.id) {
        this.itemService
          .updateItem({ ...item, id: currentItem.id })
          .then(() => {
            this.clearForm();
            this.editIndex = null;
          });
      }
    } else {
      this.itemService.addItem(item).then(() => {
        this.clearForm();
      });
    }
  }

  editItem(index: number) {
    const item = this.items[index];
    this.newItemName = item.name;
    this.newItemQuantity = item.quantity;
    this.editIndex = index;
  }

  removeItem(index: number) {
    const item = this.items[index];
    if (item.id) {
      this.itemService.deleteItem(item.id).then(() => {
        if (this.editIndex === index) {
          this.clearForm();
          this.editIndex = null;
        }
      });
    }
  }

  toggleItemDone(item: Item) {
    if (item.id) {
      this.itemService.updateItem({ ...item });
    }
  }

  clearForm() {
    this.newItemName = '';
    this.newItemQuantity = null;
  }

  get isShoppingDoneDisabled(): boolean {
    return !this.items.some((item) => item.done && item.id);
  }

  shoppingDone() {
    const checkedItems = this.items.filter((item) => item.done && item.id);
    checkedItems.forEach((item) => {
      if (item.id) {
        this.itemService.deleteItem(item.id);
      }
    });
  }
}
