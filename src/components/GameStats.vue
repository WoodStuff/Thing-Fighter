<script setup lang="ts">
import { useStatsStore } from '@/stores/stats';
import { storeToRefs } from 'pinia';

const stats = useStatsStore();
const { kills, deaths } = storeToRefs(stats);
</script>

<template>
	<div class="game-stats">
		<p>{{ kills }}⚔️</p>
		<p>{{ deaths }}💀</p>
	</div>
</template>

<style lang="scss" scoped>
.game-stats {
	display: flex;
	gap: 20px;
}
</style>