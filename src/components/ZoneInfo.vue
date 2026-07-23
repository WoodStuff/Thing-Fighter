<script setup lang="ts">
import { useBattleStore } from '@/stores/battle';
import { useEnemyStore } from '@/stores/enemy';
import { storeToRefs } from 'pinia';

const battleStore = useBattleStore();
const { zone, enemyNumber } = storeToRefs(battleStore);
</script>

<template>
	<div class="zone-info">
		<h1>Zone {{ zone }}</h1>
		<p>Enemy {{ enemyNumber }}/100</p>
	</div>
</template>

<style lang="scss" scoped>
.zone-info {
	position: absolute;
	top: 8px;

	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>