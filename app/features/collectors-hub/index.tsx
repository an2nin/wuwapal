'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { RESONATORS, WEAPONS_FOR_COLLECTION } from '@/data';
import { getGachaItemsResources } from '@/features/collectors-hub/api/get-gacha-items';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import useIndexDB from '@/shared/hooks/use-index-db';
import { useAccountStore } from '@/shared/stores/account';
import { useExternalCollectionStore } from '@/shared/stores/external-collection';
import CollectionDialogProvider from './components/collection-dialog-provider';
import CollectionList from './components/collection-list';
import { mergeCollectionCounts, processBannersForCollection } from './utils/processors';

type CollectionTab = 'resonator' | 'weapon';

const COLLECTION_TABS: CollectionTab[] = ['resonator', 'weapon'] as const;

function isValidTab(value: string): value is CollectionTab {
  return COLLECTION_TABS.includes(value as CollectionTab);
}

/**
 * CollectorsHub - Main component for managing and viewing game collections
 *
 * Features:
 * - View resonator and weapon collections
 * - Merge data from banners and external sources
 * - Tab-based navigation between collection types
 */
export default function CollectorsHub() {
  const activeProfileId = useAccountStore(state => state.active);
  const { banners } = useIndexDB(activeProfileId);
  const { data: remoteResources } = useQuery({
    queryKey: ['collectors-hub', 'wuwa-gacha-items'],
    queryFn: getGachaItemsResources,
    staleTime: 1000 * 60 * 30,
  });
  const externalCollection = useExternalCollectionStore(state =>
    state.getCollectionForProfile(activeProfileId),
  );

  // Process banner data into collection format
  const bannerCollections = useMemo(
    () => processBannersForCollection(banners ?? null),
    [banners],
  );

  // Merge banner collections with external collection data
  const mergedCollections = useMemo(
    () => mergeCollectionCounts(bannerCollections, externalCollection),
    [bannerCollections, externalCollection],
  );
  const hasRemoteResources = (remoteResources?.resonators && Object.keys(remoteResources.resonators).length > 0)
    || (remoteResources?.weapons && Object.keys(remoteResources.weapons).length > 0);
  const resonatorResources = hasRemoteResources ? remoteResources.resonators : RESONATORS;
  const weaponResources = hasRemoteResources ? remoteResources.weapons : WEAPONS_FOR_COLLECTION;

  const [activeTab, setActiveTab] = useState<CollectionTab>('resonator');

  const handleTabChange = (value: string) => {
    if (isValidTab(value)) {
      setActiveTab(value);
    }
  };

  return (
    <CollectionDialogProvider>
      <div className="flex flex-col h-full w-full">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex flex-col flex-1"
        >
          <TabsList className="w-fit">
            <TabsTrigger value="resonator">
              Resonators
            </TabsTrigger>
            <TabsTrigger value="weapon">
              Weapons
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="resonator"
            className="mt-6 flex-1"
          >
            <CollectionList
              type="resonator"
              resources={resonatorResources}
              collected={mergedCollections.resonators}
            />
          </TabsContent>

          <TabsContent
            value="weapon"
            className="mt-6 flex-1"
          >
            <CollectionList
              type="weapon"
              resources={weaponResources}
              collected={mergedCollections.weapons}
            />
          </TabsContent>
        </Tabs>
      </div>
    </CollectionDialogProvider>
  );
}
