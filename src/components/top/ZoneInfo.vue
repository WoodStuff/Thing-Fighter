<script setup lang="ts">
import { useBattleStore } from '@/stores/battle';
import { useEnemyStore } from '@/stores/enemy';
import { storeToRefs } from 'pinia';

const battleStore = useBattleStore();
const { zone, enemyNumber } = storeToRefs(battleStore);
</script>

<template>
	<div class="zone-info">
		<h2>Zone {{ zone }}</h2>
		<p>Enemy {{ enemyNumber }}/100</p>
	</div>
</template>

<style lang="scss" scoped>
.zone-info {
	position: absolute;
	left: 0;
	z-index: 1;

	display: flex;
	flex-direction: column;
	align-items: center;

	width: 150px;

	background-color: #e7e7e7;
	padding: 8px;

	border: 0 solid black;
	border-width: 0 2px 2px 0;
	border-bottom-right-radius: 8px;
}
</style>