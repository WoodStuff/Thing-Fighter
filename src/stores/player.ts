import { ref } from "vue";

const hpMax = ref(10);
const hp = ref(10);
const attack = ref(3);

function damageFor(amount: number) {
	if (amount <= 0) return;

	hp.value -= amount;
}

export const usePlayer = () => ({
	hpMax,
	hp,
	attack,

	damageFor,
});