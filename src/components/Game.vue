<script setup lang="ts">
import EnemyStats from './stats/EnemyStats.vue';
import PlayerStats from './stats/PlayerStats.vue';
</script>

<template>
	<div class="stats">
		<PlayerStats />
		<EnemyStats />
	</div>
</template>

<style lang="scss" scoped>
.stats {
	display: flex;
	gap: 80px;
}
</style>