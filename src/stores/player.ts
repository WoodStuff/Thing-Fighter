import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore('player', () => {
	const coolAsFuckNumber = ref(78);
	
	return {
		coolAsFuckNumber
	};
});