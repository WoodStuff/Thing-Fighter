import { computed, nextTick, ref } from "vue";
import { useEnemyStore } from "./enemy";
import { usePlayerStore } from "./player";
import { defineStore } from "pinia";
import { useStatsStore } from "./stats";
import { random } from "@/utils";

let player: ReturnType<typeof usePlayerStore>;
let enemy: ReturnType<typeof useEnemyStore>;
let stats: ReturnType<typeof useStatsStore>;

const battling = computed(() => player.isAttacking || enemy.isAttacking);

//#region turns
async function playerTurn() {
	const damage = random(player.attackLow, player.attackHigh)
	enemy.damageFor(damage);

	await nextTick();

	checkDeath();
}

async function enemyTurn() {
	const damage = random(enemy.attackLow, enemy.attackHigh)
	player.damageFor(damage);

	await nextTick();

	checkDeath();
}
//#endregion

//#region battle end
function checkDeath() {
	if (!enemy.isDead && !player.isDead) return;

	if (player.isDead) {
		onPlayerDeath();
	}

	if (enemy.isDead) {
		onEnemyDeath();
	}
}

function onPlayerDeath() {
	stopBattle();
	stats.deaths++;
}

function onEnemyDeath() {
	stats.gold += enemy.goldDrop;
	stats.kills++;

	enemy.regenerate(enemyTurn);
}
//#endregion

//#region battle control
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
//#endregion

export const useBattleStore = defineStore('battle', () => {
	player = usePlayerStore();
	enemy = useEnemyStore();
	stats = useStatsStore();

	return {
		battling,

		startBattle,
	}
});