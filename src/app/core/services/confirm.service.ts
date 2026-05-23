import { Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { OverlayStackService } from './overlay-stack.service';

export interface ConfirmOptions {
  message: string;
  header: string;
  icon?: string;
  actionText?: string;
  cancelText?: string;
  actionSeverity?: string;
  cancelSeverity?: string;
  onConfirm: () => void;
  onReject?: () => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly overlayStack = inject(OverlayStackService);
  private counter = 0;

  confirm(options: ConfirmOptions): void {
    const {
      message,
      header,
      icon,
      actionText = 'Confirm',
      cancelText = 'Cancel',
      actionSeverity = 'primary',
      cancelSeverity = 'secondary',
      onConfirm,
      onReject,
    } = options;

    const id = `confirm-${++this.counter}`;

    this.overlayStack.register(id, () => {
      this.confirmationService.close();
      onReject?.();
    });

    this.confirmationService.confirm({
      message,
      header,
      icon,
      acceptLabel: actionText,
      rejectLabel: cancelText,
      acceptButtonProps: { severity: actionSeverity },
      rejectButtonProps: { severity: cancelSeverity, outlined: true },
      accept: () => {
        this.overlayStack.release(id);
        onConfirm();
      },
      reject: () => {
        this.overlayStack.release(id);
        onReject?.();
      },
    });
  }
}
