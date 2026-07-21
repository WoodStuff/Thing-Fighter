<script setup lang="ts">
import { useBattleStore } from '@/stores/battle.ts';
import EnemyStats from './stats/EnemyStats.vue';
import PlayerStats from './stats/PlayerStats.vue';
import { storeToRefs } from 'pinia';
import GameStats from './GameStats.vue';

const battleStore = useBattleStore();
const { battling } = storeToRefs(battleStore);
const { startBattle } = battleStore;
</script>

<template>
	<div id="game">
		<div class="stats">
			<PlayerStats />
			<EnemyStats />
		</div>
		<button
			@click="startBattle"
			:disabled="battling"
		>Start Battle</button>
		<GameStats />
	</div>
</template>

<style lang="scss" scoped>
#game {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 12px;

	width: 100%;
	height: 100%;

	font-size: 1.2em;

	& > .stats {
		display: flex;
		gap: 80px;
	}
}
</style>