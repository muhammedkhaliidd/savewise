import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messageService = inject(MessageService);

  private emit(severity: string, title: string, message: string, duration: number): void {
    this.messageService.add({ severity, summary: title, detail: message, life: duration });
  }

  show(title: string, message: string, duration: number = 4000): void {
    this.emit('info', title, message, duration);
  }

  success(title: string, message: string, duration: number = 4000): void {
    this.emit('success', title, message, duration);
  }

  error(title: string, message: string, duration: number = 4000): void {
    this.emit('error', title, message, duration);
  }

  warn(title: string, message: string, duration: number = 4000): void {
    this.emit('warn', title, message, duration);
  }

  info(title: string, message: string, duration: number = 4000): void {
    this.emit('info', title, message, duration);
  }
}
