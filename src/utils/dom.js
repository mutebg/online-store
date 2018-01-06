export const getFormData = form => {
  const inputs = form.getElementsByTagName("input");
  const selects = form.getElementsByTagName("select");
  const output = [];
  nodeListToArray(inputs)
    .concat(nodeListToArray(selects))
    .forEach(i => {
      if (i.name) {
        output.push([i.name, i.value]);
      }
    });

  return output;
};

export const nodeListToArray = nodelist => [].slice.call(nodelist);
