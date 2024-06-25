import Image from "next/image";
import { client } from "./contentful";
import Link from "next/link";
import { PostItem } from "./[slug]/types";

export const revalidate = 60;

export default async function Home() {
  const getPostEntries = async (): Promise<any> => {
    const entries = await client.getEntries({
      content_type: "simplePost",
    });
    return entries;
  };

  const postEntries = await getPostEntries();
  const posts = postEntries.items;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text-2xl text-bold">Blog listing goes here:</p>

      <div className="flex flex-row gap-10 p-10">
        {posts.map((singlePost: PostItem) => {
          const { slug, name, image } = singlePost.fields;
          return (
            <div key={slug}>
              <Link href={`/${slug}`}>
                {image && (
                  <Image
                    src={`https:${(image as any).fields.file.url}`} // Use image URL
                    alt={(image as any).fields.title as string}
                    width={500} // Set appropriate width
                    height={300} // Set appropriate height
                  />
                )}

                {/* 
                <div className="text-xs text-right w-full my-2">
                  Posted on{" "}
                  {new Date(singlePost.sys.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div> */}

                <h2 className="text-center text-xl text-bold my-2">
                  {name as string}
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
