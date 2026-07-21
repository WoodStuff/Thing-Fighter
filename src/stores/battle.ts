import { computed, ref } from "vue";
import { useEnemyStore } from "./enemy";
import { usePlayerStore } from "./player";
import { defineStore } from "pinia";
import { useStatsStore } from "./stats";
import { random } from "@/utils";

export const useBattleStore = defineStore('battle', () => {
	const player = usePlayerStore();
	const enemy = useEnemyStore();
	const stats = useStatsStore();

	const battling = computed(() => player.isAttacking || enemy.isAttacking);

	function playerTurn() {
		const damage = random(player.attackLow, player.attackHigh)
		enemy.damageFor(damage);

		checkDeath();
	}

	function enemyTurn() {
		const damage = random(enemy.attackLow, enemy.attackHigh)
		player.damageFor(damage);
		
		checkDeath();
	}

	function checkDeath() {
		if (!enemy.isDead && !player.isDead) return;

		if (player.isDead) {
			stopBattle();
			stats.deaths++;
		}

		if (enemy.isDead) {
			enemy.regenerate(enemyTurn);
			stats.kills++;
		}
	}

	function startBattle() {
		if (battling.value) return;

		if (player.isDead) {
			player.hp = player.hpMax;
		}

		player.startAttacking(playerTurn);
		enemy.startAttacking(enemyTurn);
	}

	function stopBattle() {
		player.stopAttacking();
		enemy.stopAttacking();
	}

	return {
		battling,

		startBattle,
	}
});