import { createCurrentUserHook, createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  projectId: "s1x4k9uf",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: process.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
export const useCurrentUser = createCurrentUserHook(config);
