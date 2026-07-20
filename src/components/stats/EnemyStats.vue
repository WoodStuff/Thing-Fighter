<script setup lang="ts">
import { useEnemyStore } from '@/stores/enemy';
import { storeToRefs } from 'pinia';

const enemy = useEnemyStore();
const { hpMax, hp, attack } = storeToRefs(enemy);
</script>

<template>
	<div>
		<h1>Enemy</h1>
		<p>HP: {{ hp }}/{{ hpMax }}</p>
		<p>{{ attack }} DMG</p>
	</div>
</template>