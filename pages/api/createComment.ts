// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

export const config = {
  projectId: "s1x4k9uf",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production",
  token:
    "skU9OfwhqmUpsQx4hqDgAVH2CNWRWO17KNiMElwgxIlLNfCveHuyAZrFFblgW5aXIbw3vw0Ot3pR5WNBtZrQ6h2jGkQK6JwVERFtp6wg6HbfJIXt4bah3KA9bWoxJXBgNP8eWZGsUxRhIP0hD5Stm2wZtl7cT1cAX0g9IuegLWbQQaaOAaZZ",
};
const client = sanityClient(config);
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not submit comment", error });
  }
  return res.status(200).json({ message: "Comment submitted" });
}
