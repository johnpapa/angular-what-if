export function logMessage(group: string, messages: any[], tables?: any[]) {
  console.groupCollapsed(group);
  messages.forEach((m) => console.log(m));
  if (tables?.length) {
    tables.forEach((t) => console.table(t));
  }
  console.groupEnd();
}

export function logErrorMessage(
  group: string,
  messages: any[],
  tables?: any[],
) {
  console.groupCollapsed(group);
  messages.forEach((m) => console.error(m));
  if (tables?.length) {
    tables.forEach((t) => console.table(t));
  }
  console.groupEnd();
}
