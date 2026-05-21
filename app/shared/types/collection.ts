export interface CollectionItem {
  name: string;
  quality: string;
  attributes: Record<string, string>;
}

export type CollectionData = Record<string, CollectionItem[]>;

export type CollectedItemsCount = Record<string, Record<string, number>>;
