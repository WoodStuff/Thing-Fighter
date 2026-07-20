import { ref } from "vue";

const hpMax = ref(10);
const hp = ref(10);
const attack = ref(2);

export const useEnemy = () => ({
	hpMax,
	hp,
	attack,
});