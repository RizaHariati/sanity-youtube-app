export default {
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "comment",
      type: "string",
    },
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "comment will not show until approved",
    },
  ],
};
