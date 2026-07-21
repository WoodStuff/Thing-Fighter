<script setup lang="ts">
import { useEnemyStore } from '@/stores/enemy';
import { storeToRefs } from 'pinia';
import HPBar from '../HPBar.vue';

const enemyStore = useEnemyStore();
const { hpMax, hp, attack } = storeToRefs(enemyStore);
</script>

<template>
	<div class="enemy-stats">
		<h1>Enemy</h1>
		<HPBar :current="hp" :max="hpMax" />
		<p>{{ attack }} DMG</p>
	</div>
</template>

<style lang="scss" scoped>
.enemy-stats {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}
</style>