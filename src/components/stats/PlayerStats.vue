<script setup lang="ts">
import { usePlayer } from '@/stores/player';

const { hpMax, hp, attack } = usePlayer();
</script>

<template>
	<div>
		<h1>Player</h1>
		<p>HP: {{ hp }}/{{ hpMax }}</p>
		<p>{{ attack }} DMG</p>
	</div>
</template>