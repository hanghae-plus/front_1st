function Worker(health) {
  this._health = health ?? 10;
}

function JuniorEngineer(health, intelligence) {
  this._super(health);
  this._intelligence = intelligence ?? 1;
  this._isBornGenius = this._intelligence > 10;
}

Worker.prototype.getHealth = function () {
  return this._health;
};

Worker.prototype.work = function () {
  this._health--;
};

JuniorEngineer.prototype = Object.create(Worker.prototype);
JuniorEngineer.prototype.constructor = JuniorEngineer;
JuniorEngineer.prototype._super = function (health) {
  Worker.call(this, health);
};

JuniorEngineer.prototype.getIntelligence = function () {
  return this._intelligence;
};
JuniorEngineer.prototype.work = function () {
  Worker.prototype.work.call(this);
  this._intelligence++;
};
JuniorEngineer.prototype.isBornGenius = function () {
  return this._isBornGenius ?? false;
};

function main() {
  var startTime = performance.now();
  for (var i = 0; i < 10000000; i++) {
    new JuniorEngineer(10, Math.floor(Math.random() * 20)).isBornGenius();
  }
  var endTime = performance.now();

  console.log(endTime - startTime);
}

main();
