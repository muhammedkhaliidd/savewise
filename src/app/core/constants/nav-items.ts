export interface NavItem {
  labelKey: string;
  route: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.dashboard', route: '/dashboard', icon: 'pi pi-home' },
  { labelKey: 'nav.liveRates', route: '/live-rates', icon: 'pi pi-bolt' },
  { labelKey: 'nav.configurations', route: '/configurations', icon: 'pi pi-sliders-h' },
  { labelKey: 'nav.settings', route: '/settings', icon: 'pi pi-cog' },
];
