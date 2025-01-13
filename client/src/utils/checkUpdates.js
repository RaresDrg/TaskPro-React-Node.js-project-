export function checkUpdates(initialValues, actualValues) {
  return JSON.stringify(initialValues) !== JSON.stringify(actualValues);
}
