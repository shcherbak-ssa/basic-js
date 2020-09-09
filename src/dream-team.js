const CustomError = require("../extensions/custom-error");

class DreamTeam {
  constructor(members) {
    this.members = members;
  }

  static create(members) {
    return new DreamTeam(members);
  }

  removeNotStringItems() {
    this.members = this.members.filter((item) => typeof item === 'string');
    return this;
  }
  leaveOnlyFirstLetters() {
    this.members = this.members.map((item) => item.trim().toUpperCase()[0]);
    return this;
  }
  sortAndJoin() {
    return this.members.sort().join('');
  }
}

module.exports = function createDreamTeam(members) {
  return isInvalidMembers(members)
    ? false : DreamTeam.create(members).removeNotStringItems().leaveOnlyFirstLetters().sortAndJoin();
};

function isInvalidMembers(members) {
  return false
    || members === undefined
    || !Array.isArray(members)
}