const ifArrayEmpty = (array) => {
  if (array !== undefined && array.length !== 0) {
    return false;
  }
  return true;
};

const parseChoices = (frameworkChoices, commonChoices) => {
  const choices = [];

  for (const category in frameworkChoices) {
    frameworkChoices[category].forEach((choice) => {
      choices.push({ ...choice, name: `${category}: ${choice.name}` });
    });
  }

  for (const category in commonChoices) {
    commonChoices[category].forEach((choice) => {
      choices.push({ ...choice, name: `${category}: ${choice.name}` });
    });
  }

  return choices;
};

export { ifArrayEmpty, parseChoices };
