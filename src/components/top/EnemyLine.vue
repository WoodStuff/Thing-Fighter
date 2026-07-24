<script setup lang="ts">
import { useBattleStore } from '@/stores/battle';
import { storeToRefs } from 'pinia';
import { computed, useTemplateRef, watch } from 'vue';
import EnemySquare from './EnemySquare.vue';
import gsap from 'gsap';
import { useWindowSize } from '@/composables/useWindowSize.ts';

const battleStore = useBattleStore();
const { zone, enemyNumber } = storeToRefs(battleStore);

const el = useTemplateRef('el');

type Enemy = { zone: number, id: number };

const enemies = computed<Enemy[]>(() => {
	const numberArray = [...Array(100).keys()].map(n => n + 1);
	const enemyArray: Enemy[] = numberArray.map(n => ({
		zone: zone.value,
		id: n,
	}));
	return enemyArray;
});

const { width } = useWindowSize();

watch([enemyNumber, width], move);

function move() {
	const greenCells = 6;

	const cellsToMove = enemyNumber.value - 1 - greenCells;
	const x = Math.min(Math.max(cellsToMove * -40, -(4000 - width.value + 150)), 0);

	gsap.to(el.value, {
		x,

		duration: 0.25,
		ease: 'power2.out',
	});
}
</script>

<template>
	<div class="enemy-line" ref="el">
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
}
</style>