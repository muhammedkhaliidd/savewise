import { Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

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

    this.confirmationService.confirm({
      message,
      header,
      icon,
      acceptLabel: actionText,
      rejectLabel: cancelText,
      acceptButtonProps: { severity: actionSeverity },
      rejectButtonProps: { severity: cancelSeverity, outlined: true },
      accept: onConfirm,
      reject: onReject,
    });
  }
}
