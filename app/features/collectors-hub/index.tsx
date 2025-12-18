'use client';

import { useMemo, useState } from 'react';
import { RESONATORS, WEAPONS_FOR_COLLECTION } from '@/data';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import useIndexDB from '@/shared/hooks/use-index-db';
import { useAccountStore } from '@/shared/stores/account';
import { useExternalCollectionStore } from '@/shared/stores/external-collection';
import CollectionDialogProvider from './components/collection-dialog-provider';
import CollectionList from './components/collection-list';
import ExternalCollectionForm from './components/external-collection-form';
import { mergeCollectionCounts, processBannersForCollection } from './utils/processors';

export default function CollectorsHub() {
  const accountStore = useAccountStore(state => state);
  const { banners } = useIndexDB(accountStore.active);
  const externalCollection = useExternalCollectionStore(state =>
    state.getCollectionForProfile(accountStore.active),
  );
  const bannerCollections = useMemo(
    () => processBannersForCollection(banners ?? null),
    [banners],
  );
  const mergedCollections = useMemo(
    () => mergeCollectionCounts(bannerCollections, externalCollection),
    [bannerCollections, externalCollection],
  );
  const [currentTab, setCurrentTab] = useState<'resonator' | 'weapon'>('resonator');

  return (
    <CollectionDialogProvider>
      <Tabs
        value={currentTab}
        onValueChange={(value) => {
          if (value === 'resonator' || value === 'weapon') {
            setCurrentTab(value);
          }
        }}
      >
        <TabsList>
          <TabsTrigger value="resonator">Resonators</TabsTrigger>
          <TabsTrigger value="weapon">Weapons</TabsTrigger>
        </TabsList>

        <div className="my-1"></div>

        <div
          className={`${currentTab === 'resonator' ? 'block' : 'hidden'}`}
        >
          <ExternalCollectionForm
            activeProfileId={accountStore.active}
            type="resonator"
            resources={RESONATORS}
          />
          <CollectionList
            type={currentTab}
            resources={RESONATORS}
            collected={mergedCollections?.resonators}
          />
        </div>
        <div className={`${currentTab === 'weapon' ? 'block' : 'hidden'}`}>
          <ExternalCollectionForm
            activeProfileId={accountStore.active}
            type="weapon"
            resources={WEAPONS_FOR_COLLECTION}
          />
          <CollectionList
            type={currentTab}
            resources={WEAPONS_FOR_COLLECTION}
            collected={mergedCollections?.weapons}
          />
        </div>
      </Tabs>
    </CollectionDialogProvider>
  );
}
