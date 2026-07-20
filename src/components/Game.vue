<script setup lang="ts">
import { useBattleStore } from '@/stores/battle.ts';
import EnemyStats from './stats/EnemyStats.vue';
import PlayerStats from './stats/PlayerStats.vue';
import { storeToRefs } from 'pinia';

const battleStore = useBattleStore();
const { battling } = storeToRefs(battleStore);
const { startBattle } = battleStore;
</script>

<template>
	<div class="stats">
		<PlayerStats />
		<EnemyStats />
	</div>
	<button
		@click="startBattle"
		:disabled="battling"
	>Start Battle</button>
</template>

<style lang="scss" scoped>
.stats {
	display: flex;
	gap: 80px;
}
</style>