import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useEnemyStore = defineStore('enemy', () => {
	const hpMax = ref(0);
	const hp = ref(0);
	const attack = ref(0);
	const attackCooldown = ref(0);

	const isDead = computed(() => hp.value <= 0);

	function damageFor(amount: number) {
		if (amount <= 0) return;

		hp.value -= amount;
	}

	function regenerate() {
		hpMax.value = 10;
		hp.value = hpMax.value;

		attack.value = 2;
		attackCooldown.value = 600;
	}

	regenerate();

	watch(hp, () => {
		if (hp.value < 0) hp.value = 0;
	});

	return {
		hpMax,
		hp,
		attack,
		attackCooldown,
		
		isDead,

		damageFor,

		regenerate,
	};
});