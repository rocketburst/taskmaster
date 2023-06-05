export const CREATE_ACTION_STRING =
  "databases.*.collections.*.documents.*.create";

export const UPDATE_ACTION_STRING =
  "databases.*.collections.*.documents.*.update";

export const DELETE_ACTION_STRING =
  "databases.*.collections.*.documents.*.delete";

export const PROMPT_STRING = `I have a couple tasks I need to do. They are listed below along with what priority they have. Can you summarize them into a neat and concise sentence? Can you make sure the tasks are mentioned by order of priority (highest to lowest) without mentioning the tasks' priorities in your response? If there are too many tasks in one particular category of priority, only mention in your response the tasks that are most important to an average person in that particular category. Make sure that your response is a neat concise sentence and that the response doesn't mention the task priorities (i.e. don't say that the task is a particular priority in your response, but put the task in the proper order).
`;
