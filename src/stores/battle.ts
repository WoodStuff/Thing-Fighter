import { computed, ref } from "vue";
import { useEnemyStore } from "./enemy";
import { usePlayerStore } from "./player";
import { defineStore } from "pinia";

export const useBattleStore = defineStore('battle', () => {
	const player = usePlayerStore();
	const enemy = useEnemyStore();

	const playerTurnInterval = ref(-1);
	const enemyTurnInterval = ref(-1);
	const battling = computed(() => playerTurnInterval.value !== -1 || enemyTurnInterval.value !== -1);

	function playerTurn() {
		enemy.damageFor(player.attack);
		checkEnd();
	}

	function enemyTurn() {
		player.damageFor(enemy.attack);
		checkEnd();
	}

	function checkEnd() {
		if (!enemy.isDead && !player.isDead) return;

		stopBattle();

		if (enemy.isDead) {
			enemy.regenerate();
		}
	}

	function startBattle() {
		if (battling.value) return;

		if (player.isDead) {
			player.hp = player.hpMax;
		}

		playerTurnInterval.value = setInterval(playerTurn, player.attackCooldown);
		enemyTurnInterval.value = setInterval(enemyTurn, enemy.attackCooldown);
	}

	function stopBattle() {
		clearInterval(playerTurnInterval.value);
		clearInterval(enemyTurnInterval.value);
		playerTurnInterval.value = -1;
		enemyTurnInterval.value = -1;
	}

	return {
		playerTurnInterval,
		enemyTurnInterval,
		battling,

		startBattle,
	}
});