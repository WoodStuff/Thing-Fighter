import { type LucideIcon, ShieldIcon, SwordIcon } from '@lucide/vue';

type Drop = {
	icon: LucideIcon;
	name: string;
};
type ZoneDrops = { [enemy: number]: Drop };
type GameDrops = { [zone: number]: ZoneDrops };

/**
 * A table of all special enemy drops.
 */
export const drops: GameDrops = {
	1: {
		15: {
			icon: ShieldIcon,
			name: 'Health Upgrade',
		},
		50: {
			icon: SwordIcon,
			name: 'Attack Upgrade'
		},
	},
};

/**
 * Gets the special enemy drop at a point.
 */
export function getDropAt(zone: number, enemy: number) {
	const zoneDrops = drops[zone];
	if (zoneDrops === undefined) return undefined;

	const drop = zoneDrops[enemy];
	return drop;
}