export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getTaskSections = (str: string) => ({
  highPriority: str.substring(
    str.indexOf("High Priority Tasks"),
    str.indexOf("Medium Priority Tasks")
  ),
  mediumPriority: str.substring(
    str.indexOf("Medium Priority Tasks"),
    str.indexOf("Low Priority Tasks")
  ),
  lowPriority: str.substring(str.indexOf("Low Priority Tasks")),
});

export const extractTasks = (str: string) => {
  const regex = /-\s(.+)/g;
  const matches = str.match(regex) as RegExpMatchArray;
  const tasks = matches.map(match => match.replace("- ", ""));
  return tasks;
};

export const isTaskStringValid = (str: string) => {
  const expectedHeaders = [
    "Low Priority Tasks",
    "Medium Priority Tasks",
    "High Priority Tasks",
  ];
  const lines = str.split("\n");

  expectedHeaders.forEach(header => {
    if (lines[0].trim() !== header) return false;
  });

  lines.forEach(element => {
    const line = element.trim();
    if (line === "") return;
    if (!line.startsWith("- ")) return false;
  });

  return true;
};
