import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  onValue,
  push,
  update,
  remove,
} from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  done?: boolean;
  id?: string;
  name: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private db: Database) {
    const itemsRef = ref(this.db, 'items');
    onValue(itemsRef, (snapshot) => {
      const items: Item[] = [];
      snapshot.forEach((child) => {
        const data = child.val();
        items.push({ ...data, id: child.key });
      });
      this.itemsSubject.next(items);
    });
  }

  getItems() {
    return this.items$;
  }

  addItem(item: Omit<Item, 'id'>) {
    const itemsRef = ref(this.db, 'items');
    return push(itemsRef, item);
  }

  updateItem(item: Item) {
    if (!item.id) throw new Error(' ID missing for update');
    const itemRef = ref(this.db, `items/${item.id}`);
    return update(itemRef, {
      name: item.name,
      quantity: item.quantity,
      done: item.done ?? false,
    });
  }

  deleteItem(id: string) {
    const itemRef = ref(this.db, `items/${id}`);
    return remove(itemRef);
  }
}
