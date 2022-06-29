import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post.comments);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        setSubmitted(false);
      });
  };
  return (
    <div className="w-full flex ">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-bold capitalize text-2xl">{post.title}</h2>
        <p className=" text-sm text-gray-400 capitalize">{post.description}</p>
        <div>
          <div className="flex gap-2 items-center ">
            <Image
              src={urlFor(post.author.image).url()!}
              alt={post.author.name}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="text-sm text-gray-400">
              Blog post by <span>{post.author.name}</span> published at{" "}
              {post._createdAt}
            </p>
          </div>

          {/* --------------------------- form area -------------------------- */}

          <hr className="max-w-lg my-5 mx-auto border border-yellow-400 " />

          {submitted ? (
            <div
              className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className=" shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring text-center">
                <h1 className="text-2xl font-bold">
                  {" "}
                  Thank you for your comment!
                </h1>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="bg-yellow-400 hover:bg-yellow-600 transition-all text-white  w-full rounded py-1 mt-5"
              >
                Back
              </button>
            </div>
          ) : (
            <form
              className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className=" text-center text-yellow-400">
                Enjoyed This article?
              </h3>
              <h4 className="text-3xl text-center font-bold">
                Leave a comment below!
              </h4>
              <hr className="py-3 mt-2" />

              <input
                {...register("_id")}
                type="hidden"
                name="_id"
                value={post._id}
              />

              <label className="block mb-5">
                <span className="text-gray-700">Name</span>
                <input
                  {...register("name", { required: true })}
                  className=" shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                  placeholder="John Appleseed"
                  type="text"
                />
              </label>

              <label className="block mb-5">
                <span className="text-gray-700">Email</span>
                <input
                  {...register("email", { required: true })}
                  className=" shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                  placeholder="John Appleseed"
                  type="email"
                />
              </label>

              <label className="block mb-5">
                <span className="text-gray-700">Name</span>
                <textarea
                  {...register("comment", { required: true })}
                  className=" shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                  placeholder="John Appleseed"
                  rows={8}
                />
              </label>
              <div>
                {errors.name && (
                  <p className="text-sm text-red-600">
                    The name field is required
                  </p>
                )}
                {errors.email && (
                  <p className="text-sm text-red-600">
                    The email field is required
                  </p>
                )}
                {errors.comment && (
                  <p className="text-sm text-red-600">
                    The comment field is required
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-600 transition-all text-white  w-full rounded py-1 mt-5"
              >
                Submit
              </button>
              {post.comments.map((item) => {
                const { _id, name, comment } = item;
                return (
                  <div key={_id}>
                    <h4>from: {name}</h4>
                    <p>comment :{comment}</p>
                  </div>
                );
              })}
            </form>
          )}
          <hr className="max-w-lg my-5 mx-auto border border-yellow-400 " />

          {/* --------------------------- paragraph -------------------------- */}
          <div className="mb-5">
            {post.body.map((paragraph) => {
              return (
                <div key={paragraph._key} className="mb-5">
                  <div>
                    {paragraph.children.map((item) => {
                      return <p key={item._key}>{item.text}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" max-w-xl max-h-80 mx-auto overflow-hidden mb-10 object-cover object-center">
            <Image
              src={urlFor(post.mainImage).url()!}
              alt={post.title}
              width={600}
              height={400}
              layout="responsive"
              className="object-center object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type=="post"]{
  _id,
  slug{
  current,
}
}`;

  const data = await sanityClient.fetch(query);

  const paths = data.map((item: Post) => {
    return {
      params: {
        slug: item.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post"&&slug.current=="tentang-friction-log"][0]{
  _id,
  _createdAt,
  title,
  slug,
  author->{
  name, image
},
'comments':*[
  _type =="comment" &&
  post._ref == ^._id &&
  approved==true
],
description, 
mainImage, 
slug,
body,
}`;
  const post = await sanityClient.fetch(query);
  if (!post)
    return {
      notFound: true,
    };

  return {
    props: { post },
    revalidate: 60,
  };
};
