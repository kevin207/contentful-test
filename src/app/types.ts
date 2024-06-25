/* types.ts */
import { Document } from '@contentful/rich-text-types';
import { Asset } from 'contentful';

export type PostItem = {
    fields: {
        name: string;
        slug: string;
        image: Asset;
        content: Document;
    }
}
export type PostItems = ReadonlyArray<PostItem>;

export type PostQueryResult = {
    items: PostItems;
}