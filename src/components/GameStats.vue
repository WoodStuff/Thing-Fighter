<script setup lang="ts">
import { useStatsStore } from '@/stores/stats';
import gsap from 'gsap';
import { storeToRefs } from 'pinia';
import { computed, reactive, watch } from 'vue';

const stats = useStatsStore();
const { kills, deaths } = storeToRefs(stats);

const tweened = reactive({
	gold: stats.gold,
});

const gold = computed(() => tweened.gold.toFixed(0));

watch(() => stats.gold, n => {
	gsap.to(tweened, { gold: n, duration: 0.5 });
})
</script>

<template>
	<div class="game-stats">
		<div class="row">
			<p>{{ gold }}🪙</p>
		</div>
		<div class="row">
			<p>{{ kills }}⚔️</p>
			<p>{{ deaths }}💀</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.game-stats {
	display: flex;
	flex-direction: column;
	align-items: center;

	.row {
		display: flex;
		gap: 20px;
	}
}
</style>