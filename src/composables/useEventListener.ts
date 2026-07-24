import { onMounted, onUnmounted } from 'vue'

export function useEventListener<K extends keyof WindowEventMap>(event: K, callback: (e: WindowEventMap[K]) => void) {
	onMounted(() => window.addEventListener(event, callback));
	onUnmounted(() => window.removeEventListener(event, callback));
}