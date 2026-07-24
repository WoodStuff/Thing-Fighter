<script setup lang="ts">
import { useBattleStore } from '@/stores/battle';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import EnemySquare from './EnemySquare.vue';

const battleStore = useBattleStore();
const { zone } = storeToRefs(battleStore);

type Enemy = { zone: number, id: number };

const enemies = computed<Enemy[]>(() => {
	const numberArray = [...Array(100).keys()].map(n => n + 1);
	const enemyArray: Enemy[] = numberArray.map(n => ({
		zone: zone.value,
		id: n,
	}));
	return enemyArray;
});
</script>

<template>
	<div class="enemy-line">
		<EnemySquare
			v-for="enemy in enemies"
			:key="enemy.id"
			:zone="zone"
			:id="enemy.id"
		/>
	</div>
</template>

<style lang="scss" scoped>
.enemy-line {
	position: absolute;
	top: 0;
	left: 150px;

	display: flex;

	width: calc(100% - 150px);
	overflow: hidden;
}
</style>