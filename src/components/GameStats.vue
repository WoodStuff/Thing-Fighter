<script setup lang="ts">
import { useStatsStore } from '@/stores/stats';
import { storeToRefs } from 'pinia';

const stats = useStatsStore();
const { gold, kills, deaths } = storeToRefs(stats);
</script>

<template>
	<div class="game-stats">
		<div class="row">
			<p>{{ gold }}🪙</p>
		</div>
		<div class="row">
			<p>{{ kills }}⚔️</p>
			<p>{{ deaths }}💀</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.game-stats {
	display: flex;
	flex-direction: column;
	align-items: center;

	.row {
		display: flex;
		gap: 20px;
	}
}
</style>