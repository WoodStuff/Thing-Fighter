import { defineStore } from "pinia";
import { ref } from "vue";

export const useEnemyStore = defineStore('enemy', () => {
	const hpMax = ref(10);
	const hp = ref(10);
	const attack = ref(2);
	
	return {
		hpMax,
		hp,
		attack,
	};
});