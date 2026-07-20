<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { storeToRefs } from 'pinia';

const player = usePlayerStore();
const { hpMax, hp, attack } = storeToRefs(player);
</script>

<template>
	<p>HP: {{ hp }}/{{ hpMax }}</p>
	<p>{{ attack }} DMG</p>
</template>