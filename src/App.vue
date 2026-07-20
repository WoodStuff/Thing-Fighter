<script setup lang="ts">
import { usePlayerStore } from './stores/player';

const player = usePlayerStore();
</script>

<template>
	<p>{{ player.coolAsFuckNumber }}</p>
</template>