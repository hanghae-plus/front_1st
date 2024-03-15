class Worker {
  constructor(health) {
    this._health = health ?? 10;
    this._intelligence = 0;
    this._isBornGenius = false;
  }

  getHealth() {
    return this._health;
  }

  work() {
    this._health--;
  }
}

class JuniorEngineer extends Worker {
  constructor(health, intelligence) {
    super(health);
    this._intelligence = intelligence ?? 1;
    this._isBornGenius = this._intelligence > 10;
  }

  getIntelligence() {
    return this._intelligence;
  }

  work() {
    super.work();
    this._intelligence++;
    if (!this._isBornGenius && this._intelligence > 10) {
      this._isBornGenius = true;
    }
  }

  isBornGenius() {
    return this._isBornGenius;
  }
}

function main() {
  var startTime = performance.now();
  for (var i = 0; i < 10000000; i++) {
    new JuniorEngineer(10, Math.floor(Math.random() * 20)).isBornGenius();
  }
  var endTime = performance.now();

  console.log(endTime - startTime);
}

main();
