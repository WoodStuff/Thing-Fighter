<script setup lang="ts">
import { useBattleStore } from '@/stores/battle';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { zone, id } = defineProps<{
	zone: number,
	id: number,
}>();

const battle = useBattleStore();

const current = computed(() => id === battle.enemyNumber);
const cleared = computed(() => id < battle.enemyNumber);
</script>

<template>
	<div
		class="enemy-square"
		:class="{ current, cleared }"
	>
		<p class="id">{{ id }}</p>
	</div>
</template>

<style lang="scss" scoped>
.enemy-square {
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
	min-width: 40px;
	height: 40px;

	background-color: #eee;

	border: 0 solid black;
	border-width: 0 1.5px 1.5px 0;

	& > .id {
		position: absolute;
		top: 0;
		left: 2px;

		font-size: 0.6em;

		opacity: 0;
		transition: 0.25s;
	}

	&:hover > .id {
		opacity: 1;
	}

	&.current {
		background-color: #ee8;
	}
	&.cleared {
		background-color: #8d8;
	}
}
</style>