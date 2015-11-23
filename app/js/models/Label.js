import Uuid from 'uuid'

function Label (name, bugs = null) {
  //this.uid = Uuid.v1();
  this.name = name;
  if(bugs && typeof bugs === "object") {
    if (bugs.constructor.name == "Set") {
      this.bugs = bugs;
    } else {
      this.bugs = new Set(bugs);
    }
  } else {
    this.bugs = new Set();
  }

}

Label.prototype.toJSON = function () {
  return {
    uid: this.uid,
    name: this.name,
    bugs: [...this.bugs]
  };
}

Label.fromData = function (data) {
  let label = new Label(data.name, data.bugs);
  label.uid = data.uid;
  return label;
}


export default Label;
