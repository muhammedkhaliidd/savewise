import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OverlayStackService {
  private readonly stack = new Map<string, () => void>();

  register(id: string, close: () => void): void {
    this.stack.delete(id);
    this.stack.set(id, close);
  }

  release(id: string): void {
    this.stack.delete(id);
  }

  hasAny(): boolean {
    return this.stack.size > 0;
  }

  closeTop(): boolean {
    const keys = Array.from(this.stack.keys());
    const lastKey = keys[keys.length - 1];
    if (lastKey === undefined) return false;
    const close = this.stack.get(lastKey);
    this.stack.delete(lastKey);
    close?.();
    return true;
  }
}
