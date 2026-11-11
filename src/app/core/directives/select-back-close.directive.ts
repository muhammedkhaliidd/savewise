import { DestroyRef, Directive, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { OverlayStackService } from '../services/overlay-stack.service';

interface DropdownHandle {
  shown: Observable<unknown>;
  hidden: Observable<unknown>;
  close: () => void;
}

let nextId = 0;

/**
 * Registers an open p-select / p-multiSelect panel with the overlay stack so the Android back
 * button / back gesture closes the dropdown first, before the dialog or page behind it.
 */
@Directive({ selector: 'p-select, p-multiSelect, p-multiselect' })
export class SelectBackCloseDirective {
  private readonly overlays = inject(OverlayStackService);
  private readonly id = `select-${nextId++}`;

  constructor() {
    const handle = this.resolveHandle();
    if (!handle) return;

    const shownSub = handle.shown.subscribe(() => this.overlays.register(this.id, handle.close));
    const hiddenSub = handle.hidden.subscribe(() => this.overlays.release(this.id));

    inject(DestroyRef).onDestroy(() => {
      shownSub.unsubscribe();
      hiddenSub.unsubscribe();
      this.overlays.release(this.id);
    });
  }

  private resolveHandle(): DropdownHandle | null {
    const select = inject(Select, { host: true, optional: true });
    if (select) {
      return { shown: select.onShow, hidden: select.onHide, close: () => select.hide() };
    }
    const multiSelect = inject(MultiSelect, { host: true, optional: true });
    if (multiSelect) {
      return {
        shown: multiSelect.onPanelShow,
        hidden: multiSelect.onPanelHide,
        close: () => multiSelect.hide(),
      };
    }
    return null;
  }
}
