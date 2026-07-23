import { random, randomDecimal } from "@/utils";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

//#region stats
const hpMax = ref(0);
const hp = ref(0);
const baseAttack = ref(0);
const attackLow = computed(() => Math.round(baseAttack.value * 0.75));
const attackHigh = computed(() => Math.round(baseAttack.value * 1.25));
const attackCooldown = ref(0);
//#endregion

//#region battle
const attackInterval = ref(-1);
function startAttacking(turnFunction: () => void) {
	attackInterval.value = setInterval(turnFunction, attackCooldown.value);
}
function stopAttacking() {
	clearInterval(attackInterval.value)
	attackInterval.value = -1;
}
//#endregion

//#region flags
const isDead = computed(() => hp.value <= 0);
const isAttacking = computed(() => attackInterval.value !== -1);
//#endregion

//#region enemy-specific attributes
const goldDrop = ref(0);
//#endregion

//#region actions
function damageFor(amount: number) {
	if (amount <= 0) return;

	hp.value -= amount;
}
//#endregion

//#region enemy generation
function regenerate(enemyNumber: number, turnFunction?: () => void) {
	setStats(enemyNumber);
	
	goldDrop.value = random(2, 4);

	stopAttacking();
	if (turnFunction) startAttacking(turnFunction);
}

function setStats(enemyNumber: number) {
	const n = enemyNumber - 1;

	const healthMult = 1.04 ** (n);
	const attackMult = 1.04 ** (n);

	hpMax.value = Math.round(randomDecimal(10, 15) * healthMult);
	hp.value = hpMax.value;

	baseAttack.value = Math.round(randomDecimal(2, 3) * attackMult);
	attackCooldown.value = random(350, 750);
}
//#endregion

watch(hp, () => {
	if (hp.value < 0) hp.value = 0;
});

export const useEnemyStore = defineStore('enemy', () => ({
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
}));