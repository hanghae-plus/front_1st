function Worker(health) {
  this._health = health ?? 10;
}

function JuniorEngineer(health, intelligence) {
  this._super(health);
  this._intelligence = intelligence ?? 1;
  this._isBornGenius = intelligence > 10;
}

Worker.prototype.work = function () {
  this._health--;
};

Worker.prototype.getHealth = function () {
  return this._health;
};

JuniorEngineer.prototype = Object.create(Worker.prototype, {});

JuniorEngineer.prototype._super = function (health) {
  return Worker.call(this, health);
};

JuniorEngineer.prototype.getIntelligence = function () {
  return this._intelligence;
};

JuniorEngineer.prototype.work = function () {
  Worker.prototype.work.call(this);
  this._intelligence++;
};

JuniorEngineer.prototype.isBornGenius = function () {
  return this._isBornGenius;
};

function main() {
  var startTime = performance.now();
  console.time();
  const amount = 10000000;
  for (var i = 0; i < amount; i++) {
    new JuniorEngineer(10, Math.floor(Math.random() * 20)).isBornGenius();
    // %DebugPrint(junior);
  }
  var endTime = performance.now();
  console.timeEnd();

  // console.log(endTime - startTime);
}

main();

export { Worker, JuniorEngineer };
