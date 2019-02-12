module.exports = function resolveObjects(obj) {
  let objCopy = { ...obj };
  for (let key of Object.keys(objCopy)) {
    if (key.includes(".")) {
      let queue = key.split(".");
      let value = objCopy[key];
      let currentObj = objCopy;
      // Create/Alter properties from queue
      for (let i = 0; i < queue.length; i++) {
        // If property doesn't exist; Create it!
        if (!currentObj[queue[i]]) {
          currentObj[queue[i]] = i === queue.length - 1 ? value : {};
        }
        currentObj = currentObj[queue[i]];
      }
      // Clean up
      delete objCopy[key];
    }
    // Recursively resolve properties of type object
    if (typeof objCopy[key] === "object" && !Array.isArray(objCopy[key])) {
      objCopy[key] = resolveObjects(objCopy[key]);
    }
  }
  return objCopy;
};
