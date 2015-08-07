import Uuid from 'uuid'

function Filter(name, value) {
  this.uid = Uuid.v1();
  this.name = name;
  this.value = value;
}

Filter.fromData = function(data) {
  let filter = new Filter(data.name, data.value);
  filter.uid = data.uid;
  return filter;
}

export default Filter;
