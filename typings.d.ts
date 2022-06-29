export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  comments: [
    {
      _id: string;
      name: string;
      comment: string;
    }
  ];
  body: [
    {
      children: [
        {
          text: "string";
          _key: "string";
          stylee: "string";
        }
      ];
      style: "string";
      _key: "string";
      _type: "string";
    }
  ];
}
