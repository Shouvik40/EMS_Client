import { Injectable } from '@angular/core';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length: number = 0;
  clear(): void {}
  getItem(key: string): string | null {
    return null;
  }
  key(index: number): string | null {
    return null;
  }
  removeItem(key: string): void {}
  setItem(key: string, value: string): void {}
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;
  constructor() {
    this.storage = new LocalStorage();
    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
    }
  }

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
