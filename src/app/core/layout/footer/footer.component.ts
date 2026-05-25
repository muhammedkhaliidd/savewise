import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, DatePipe, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="flex flex-col justify-center items-center gap-2 px-1 py-3 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-xs"
    >
      <div class="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
        <!-- updated icon with main color -->
        <i class="pi pi-clock text-[var(--color-primary)] !text-[10px]"></i>

        <span>
          @if (lastInputDate()) {
          {{ 'footer.savingsUpdated' | translate }}
          <span class="text-[var(--color-text)]">
            {{ lastInputDate() | date : 'short' }}
          </span>
          } @else {
          {{ 'footer.noSavingsYet' | translate }}
          }
        </span>
      </div>
      <div class="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
        <span>Powered by</span>
        <a
          href="https://muhammedkhaliidd.github.io/"
          target="_blank"
          class="text-[var(--color-text)]"
          >Muhammed Khalid @{{ currentYear() }}</a
        >
      </div>
    </footer>
  `,
})
export class FooterComponent {
  lastInputDate = input<string | null>(null);
  currentYear = computed(() => new Date().getFullYear());
}
