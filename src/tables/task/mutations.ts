export const mutations = `#graphql
    createTask(payload: createTaskInput!): Task
    updateTask(payload: updateTaskInput!): Task
    deleteTask(id: String!): Boolean
`;
