export interface NavItem {
  labelKey: string;
  route: string;
  icon: string;
}

/** Primary navigation shown in the header tabs (desktop) and the mobile bottom bar. */
export const TAB_ITEMS: NavItem[] = [
  { labelKey: 'nav.dashboard', route: '/dashboard', icon: 'pi pi-home' },
  { labelKey: 'nav.savings', route: '/savings', icon: 'pi pi-wallet' },
  { labelKey: 'nav.goals', route: '/goals', icon: 'pi pi-flag' },
  { labelKey: 'nav.liveRates', route: '/live-rates', icon: 'pi pi-bolt' },
  { labelKey: 'nav.configurations', route: '/configurations', icon: 'pi pi-sliders-h' },
];

/** Full navigation shown in the side menu (vertical sidebar + hamburger drawer). */
export const SIDE_NAV_ITEMS: NavItem[] = [
  ...TAB_ITEMS,
  { labelKey: 'nav.savingsCalc', route: '/savings-calc', icon: 'pi pi-calculator' },
  { labelKey: 'nav.settings', route: '/settings', icon: 'pi pi-cog' },
];
