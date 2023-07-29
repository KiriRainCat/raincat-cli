const ifArrayEmpty = (array) => {
  if (array !== undefined && array.length !== 0) {
    return false;
  }
  return true;
};

export { ifArrayEmpty };
