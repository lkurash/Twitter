export default function path(path, id) {

  let newPath = path.split("/");
  let indexId = newPath.indexOf(":id");
  newPath.splice(indexId, 1, id);

  return newPath.join("/");
}
