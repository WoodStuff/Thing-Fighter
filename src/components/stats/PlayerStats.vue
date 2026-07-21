<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { storeToRefs } from 'pinia';
import HPBar from '../HPBar.vue';

const playerStore = usePlayerStore();
const { hpMax, hp, attackLow, attackHigh } = storeToRefs(playerStore);
</script>

<template>
	<div class="player-stats">
		<h1>Player</h1>
		<HPBar :current="hp" :max="hpMax" />
		<p>{{ attackLow }}-{{ attackHigh }} DMG</p>
	</div>
</template>

<style lang="scss" scoped>
.player-stats {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}
</style>