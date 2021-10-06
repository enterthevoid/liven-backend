function getImagePath(src) {
  return src.replace(process.env.API_URL, "");
}

function comparer(otherArray) {
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other.img == current.img && other.workId == current.workId;
      }).length == 0
    );
  };
}

module.exports = { getImagePath, comparer };
