import { ref } from "vue";
import { useEventListener } from "./useEventListener";

export function useWindowSize() {
	const width = ref(0);
	const height = ref(0);

	function recalculate() {
		width.value = window.innerWidth;
		height.value = window.innerWidth;
	}
	useEventListener('resize', recalculate);
	recalculate();

	return {
		width,
		height,
	};
}