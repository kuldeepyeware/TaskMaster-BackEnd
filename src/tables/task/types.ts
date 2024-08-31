export const types = `#graphql
enum Status {
    TODO
    IN_PROGRESS
    DONE
  }

  input createTaskInput {
    title: String!
    description: String
  }

  input updateTaskInput {
    id: String!
    title: String
    description: String
    status: Status
  }

  type Task {
    id: String!
    title: String!
    description: String
    status: Status
  }

`;
