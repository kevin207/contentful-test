import { client } from "../contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

export const revalidate = 60;

interface BlogPageProps {
  params: {
    slug: string;
  };
}

const fetchBlogPost = async (slug: string): Promise<any> => {
  const queryResult = await client.getEntries({
    content_type: "simplePost",
    "fields.slug[match]": slug,
  });

  return queryResult.items[0];
};

export default async function BlogPage(props: BlogPageProps) {
  const { params } = props;
  const { slug } = params;

  const post = await fetchBlogPost(slug);
  const { name, body, image } = post.fields;

  return (
    <main className="min-h-screen p-24 flex flex-col items-center">
      {image && (
        <Image
          src={`https:${(image as any).fields.file.url}`} // Use image URL
          alt={(image as any).fields.title as string}
          width={700} // Set appropriate width
          height={500} // Set appropriate height
        />
      )}

      <div className="max-w-2xl my-4">
        <h1 className="text-2xl">{name as string}</h1>
      </div>

      <div className="[&>p]:mb-8 [&>h2]:font-extrabold w-full mt-12">
        {body && documentToReactComponents(body)}
      </div>
    </main>
  );
}
