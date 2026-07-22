import { random, randomDecimal } from "@/utils";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useEnemyStore = defineStore('enemy', () => {
	const hpMax = ref(0);
	const hp = ref(0);
	const baseAttack = ref(0);
	const attackLow = computed(() => Math.round(baseAttack.value * 0.75));
	const attackHigh = computed(() => Math.round(baseAttack.value * 1.25));
	const attackCooldown = ref(0);

	const goldDrop = ref(0);

	const isDead = computed(() => hp.value <= 0);
	const isAttacking = computed(() => attackInterval.value !== -1);

	const attackInterval = ref(-1);

	function startAttacking(turnFunction: () => void) {
		attackInterval.value = setInterval(turnFunction, attackCooldown.value);
	}

	function stopAttacking() {
		clearInterval(attackInterval.value)
		attackInterval.value = -1;
	}

	function damageFor(amount: number) {
		if (amount <= 0) return;

		hp.value -= amount;
	}

	function regenerate(turnFunction?: () => void) {
		hpMax.value = random(10, 15);
		hp.value = hpMax.value;

		baseAttack.value = randomDecimal(2, 3);
		attackCooldown.value = random(350, 750);

		goldDrop.value = random(2, 4);

		stopAttacking();
		if (turnFunction) startAttacking(turnFunction);
	}

	regenerate();

	watch(hp, () => {
		if (hp.value < 0) hp.value = 0;
	});

	return {
		hpMax,
		hp,
		baseAttack,
		attackLow,
		attackHigh,
		attackCooldown,

		goldDrop,
		
		isDead,
		isAttacking,

		attackInterval,

		startAttacking,
		stopAttacking,

		damageFor,

		regenerate,
	};
});