<script setup lang="ts">
import { useBattleStore } from '@/stores/battle';
import { useEnemyStore } from '@/stores/enemy';
import gsap from 'gsap';
import { storeToRefs } from 'pinia';
import { ref, useTemplateRef, watch } from 'vue';

const el = useTemplateRef('el');

const enemyStore = useEnemyStore();

const battleStore = useBattleStore();
const { enemyNumber } = storeToRefs(battleStore);

const goldDrop = ref(0);

function fetchEnemyInfo() {
	goldDrop.value = enemyStore.goldDrop
}

function pop() {
	if (!el.value) return;

	let tl = gsap.timeline();

	tl.to(el.value, {
		opacity: 0,
		scale: 1.3,

		duration: 0.18,
		ease: "power1.out",

		onComplete: fetchEnemyInfo,
	});
	tl.set(el.value, {
		scale: 1,
	});
	tl.to(el.value, {
		opacity: 1,
		scale: 1,

		duration: 0.4,
		delay: 0.2,
		ease: "power1.inOut",
	});
}

fetchEnemyInfo();
watch(enemyNumber, pop);
</script>

<template>
	<div class="enemy-drops" ref="el">
		{{ goldDrop }}🪙
	</div>
</template>

<style lang="scss" scoped>
.enemy-drops {
	position: absolute;
	top: 10px;
	left: calc(100% + 8px);

	white-space: nowrap;

	background-color: #0002;
	border-radius: 4px;
	padding: 2px 4px 2px 6px;
	font-size: 0.8em;
}
</style>