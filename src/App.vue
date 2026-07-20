<script setup lang="ts">
import PlayerStats from './components/PlayerStats.vue';
import { usePlayerStore } from './stores/player';

const player = usePlayerStore();
</script>

<template>
	<PlayerStats />
</template>