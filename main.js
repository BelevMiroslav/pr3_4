const logs = document.getElementById("logs");
const debugLogs = document.getElementById("debug-logs"); // Дістаємо новий контейнер для дебаг-логів

function logBattle(action) {
    const logEntry = document.createElement("div");
    logEntry.textContent = action;
    logs.prepend(logEntry);
}

// Нова функція для виведення дебаг-логів на сторінку
function logDebug(message) {
    const debugEntry = document.createElement("div");
    debugEntry.textContent = message;
    debugLogs.prepend(debugEntry);
}

const character = {
    name: "Pikachu",
    level: 1,
    health: 100,
    maxHealth: 100,
    progressBar: document.getElementById("progressbar-character"),
    healthText: document.getElementById("health-character"),
    attack: function(target) {
        const damage = 10;
        target.takeDamage(damage);
        logBattle(`${this.name} використовує Thunder Jolt і завдає ${damage} пошкоджень ${target.name}! ${target.name} має ${target.health} HP залишилося.`);
    },
    specialAttack: function(target) {
        const damage = 20;
        target.takeDamage(damage);
        logBattle(`${this.name} використовує Special Attack і завдає ${damage} пошкоджень ${target.name}! ${target.name} має ${target.health} HP залишилося.`);
    },
    takeDamage: function(amount) {
        this.health = Math.max(0, this.health - amount);
        this.updateHealth();
    },
    updateHealth: function() {
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.progressBar.style.width = `${healthPercentage}%`;
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    }
};

const enemy = {
    name: "Charmander",
    level: 1,
    health: 100,
    maxHealth: 100,
    progressBar: document.getElementById("progressbar-enemy"),
    healthText: document.getElementById("health-enemy"),
    attack: function(target) {
        const damage = 8;
        target.takeDamage(damage);
        logBattle(`${this.name} атакує та завдає ${damage} пошкоджень ${target.name}! ${target.name} має ${target.health} HP залишилося.`);
    },
    takeDamage: function(amount) {
        this.health = Math.max(0, this.health - amount);
        this.updateHealth();
    },
    updateHealth: function() {
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.progressBar.style.width = `${healthPercentage}%`;
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    }
};

// Функція для створення лічильника кліків з обмеженням
function createClickCounter(limit) {
    let count = 0;

    return function(buttonName, action) {
        if (count < limit) {
            count++;
            const message = `Кнопку '${buttonName}' натиснуто ${count} раз(ів). Залишилось: ${limit - count} натискань.`;
            console.log(message);
            logDebug(message); // Виводимо дебаг-лог на сторінку
            action(); // Виконуємо дію, передану у вигляді колбек-функції
        } else {
            const message = `Кнопка '${buttonName}' досягла ліміту у ${limit} натискань.`;
            console.log(message);
            logDebug(message); // Виводимо дебаг-лог на сторінку
        }
    };
}

// Створюємо лічильники для кожної кнопки з обмеженням в 6 натискань
const kickButtonCounter = createClickCounter(6);
const specialButtonCounter = createClickCounter(6);

// Додаємо обробники дій на кнопки
document.getElementById("btn-kick").addEventListener("click", () => {
    kickButtonCounter("Thunder Jolt", () => character.attack(enemy));
});

document.getElementById("btn-special").addEventListener("click", () => {
    specialButtonCounter("Special Attack", () => character.specialAttack(enemy));
});
