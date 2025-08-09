'use client';

import { useMemo, useState } from 'react';
import { RESONATORS, WEAPONS_FOR_COLLECTION } from '@/data';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import useIndexDB from '@/shared/hooks/use-index-db';
import { useAccountStore } from '@/shared/stores/account';
import CollectionList from './components/collection-list';
import { processBannersForCollection } from './utils/processors';

export default function CollectorsHub() {
  const accountStore = useAccountStore(state => state);
  const { banners } = useIndexDB(accountStore.active);
  const items = useMemo(() => processBannersForCollection(banners ?? null), [banners]);
  const [currentTab, setCurrentTab] = useState('resonator');

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList>
        <TabsTrigger value="resonator">Resonators</TabsTrigger>
        <TabsTrigger value="weapon">Weapons</TabsTrigger>
      </TabsList>

      <div className="my-1"></div>

      <div
        className={`${currentTab === 'resonator' ? 'block' : 'hidden'}`}
      >
        <CollectionList
          type={currentTab}
          resources={RESONATORS}
          collected={items?.resonators}
        />
      </div>
      <div className={`${currentTab === 'weapon' ? 'block' : 'hidden'}`}>
        <CollectionList
          type={currentTab}
          resources={WEAPONS_FOR_COLLECTION}
          collected={items?.weapons}
        />
      </div>
    </Tabs>
  );
}
