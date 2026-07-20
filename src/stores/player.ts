import { ref } from "vue";

const hpMax = ref(10);
const hp = ref(10);
const attack = ref(3);

export const usePlayer = () => ({
	hpMax,
	hp,
	attack,
});