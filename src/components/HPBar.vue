<script setup lang="ts">
import { computed } from 'vue';

const { current, max } = defineProps<{
	current: number,
	max: number,
}>();

const width = computed(() => `${current / max * 100}%`);
</script>

<template>
	<div class="hp-bar">
		{{ current }} / {{ max }}
		<div class="progress" :style="{ width }"></div>
	</div>
</template>

<style lang="scss" scoped>
.hp-bar {
	position: relative;
	width: 224px;

	border: black solid 1px;
	text-align: center;

	& > .progress {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);

		height: 100%;
		left: 0;
		top: 0;
		z-index: -1;

		transition: 0.2s;
	}
}
</style>