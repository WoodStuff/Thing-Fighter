import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

// stats
const hpMax = ref(15);
const hp = ref(15);
const baseAttack = ref(3);
const attackLow = computed(() => Math.round(baseAttack.value * 0.75));
const attackHigh = computed(() => Math.round(baseAttack.value * 1.25));
const attackCooldown = ref(500);

// battle
const attackInterval = ref(-1);
function startAttacking(turnFunction: () => void) {
	attackInterval.value = setInterval(turnFunction, attackCooldown.value);
}
function stopAttacking() {
	clearInterval(attackInterval.value)
	attackInterval.value = -1;
}

// flags
const isDead = computed(() => hp.value <= 0);
const isAttacking = computed(() => attackInterval.value !== -1);

// actions
function damageFor(amount: number) {
	if (amount <= 0) return;

	hp.value -= amount;
}

watch(hp, () => {
	if (hp.value < 0) hp.value = 0;
});

export const usePlayerStore = defineStore('player', () => ({
	hpMax,
	hp,
	baseAttack,
	attackLow,
	attackHigh,
	attackCooldown,

	isDead,
	isAttacking,

	attackInterval,

	startAttacking,
	stopAttacking,

	damageFor,
}));