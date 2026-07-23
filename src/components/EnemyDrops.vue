<script setup lang="ts">
import { useEnemyStore } from '@/stores/enemy';
import { storeToRefs } from 'pinia';

const enemyStore = useEnemyStore();
const { goldDrop } = storeToRefs(enemyStore);
</script>

<template>
	<div class="enemy-drops">
		{{ goldDrop }}🪙
	</div>
</template>

<style lang="scss" scoped>
.enemy-drops {
	position: absolute;
	top: 10px;
	left: calc(100% + 8px);

	white-space: nowrap;

	background-color: #0003;
	border-radius: 4px;
	padding: 2px 4px 2px 6px;
	font-size: 0.8em;
}
</style>