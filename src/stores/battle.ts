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

//#region game position
const totalEnemyNumber = ref(0);
const zone = computed(() => Math.floor((totalEnemyNumber.value - 1) / 100 + 1));
const enemyNumber = computed(() => (totalEnemyNumber.value - 1) % 100 + 1);
//#endregion

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

	nextEnemy(enemyTurn);
}
//#endregion

//#region battle control
function startBattle() {
	if (battling.value) return;

	player.hp = player.hpMax;
	enemy.hp += Math.round(enemy.hpMax * 0.25);

	player.startAttacking(playerTurn);
	enemy.startAttacking(enemyTurn);
}

function stopBattle() {
	player.stopAttacking();
	enemy.stopAttacking();
}

function nextEnemy(turnFunction?: () => void) {
	totalEnemyNumber.value++;
	enemy.regenerate(totalEnemyNumber.value, turnFunction);
}
//#endregion

export const useBattleStore = defineStore('battle', () => {
	player = usePlayerStore();
	enemy = useEnemyStore();
	stats = useStatsStore();

	nextEnemy();

	return {
		battling,

		zone,
		totalEnemyNumber,
		enemyNumber,

		startBattle,
	}
});