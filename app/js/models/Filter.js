import Uuid from 'uuid'

function Filter(name, value) {
  this.uid = Uuid.v1();
  this.name = name;
  this.value = value;
}

export default Filter;
