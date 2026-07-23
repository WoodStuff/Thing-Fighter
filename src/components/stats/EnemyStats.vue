<script setup lang="ts">
import { useEnemyStore } from '@/stores/enemy';
import { storeToRefs } from 'pinia';
import HPBar from '../HPBar.vue';
import DamageText from '../DamageText.vue';
import EnemyDrops from '../EnemyDrops.vue';

const enemyStore = useEnemyStore();
const { hpMax, hp, attackLow, attackHigh, number } = storeToRefs(enemyStore);
</script>

<template>
	<div class="enemy-stats">
		<EnemyDrops />

		<h1>Enemy {{ number }}</h1>
		<HPBar :current="hp" :max="hpMax" />
		<p>{{ attackLow }}-{{ attackHigh }} DMG</p>

		<DamageText :value="hp" :max="hpMax" />
	</div>
</template>

<style lang="scss" scoped>
.enemy-stats {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;

	position: relative;
}
</style>