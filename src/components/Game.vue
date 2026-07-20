<script setup lang="ts">
import { enemyTurn, playerTurn } from '@/battleManager.ts';
import EnemyStats from './stats/EnemyStats.vue';
import PlayerStats from './stats/PlayerStats.vue';
</script>

<template>
	<div class="stats">
		<PlayerStats />
		<EnemyStats />
	</div>
	<button @click="playerTurn">Player Turn</button>
	<button @click="enemyTurn">Enemy Turn</button>
</template>

<style lang="scss" scoped>
.stats {
	display: flex;
	gap: 80px;
}
</style>