import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const usePlayerStore = defineStore('player', () => {
	const hpMax = ref(10);
	const hp = ref(10);
	const attack = ref(3);
	const attackCooldown = ref(500);

	const isDead = computed(() => hp.value <= 0);

	function damageFor(amount: number) {
		if (amount <= 0) return;

		hp.value -= amount;
	}

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
	};
});