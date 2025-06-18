import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';
import { Database } from '@angular/fire/database';
import { of } from 'rxjs';

describe('ItemService', () => {
  let service: ItemService;

  const databaseStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemService, { provide: Database, useValue: databaseStub }],
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
