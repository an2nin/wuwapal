'use client';

import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useLayoutStore } from '@/shared/stores/layout';
import AndroidMethodList from './components/android-method-list';
import ImportBtn from './components/import-btn';
import IOSMethodList from './components/ios-method-list';
import PCMethodList from './components/pc-method-list';

export default function ImportPulls() {
  const layoutStore = useLayoutStore(state => state);
  const [conveneRecordURL, setConveneRecordURL] = useState('');
  const [gamePath, setGamePath] = useState('');

  const handleRecordURLChange = (event: any) => {
    setConveneRecordURL(event.target.value);
  };
  const handleGamePathChange = (event: any) => {
    setGamePath(event.target.value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setGamePath(layoutStore.gamePath || '');
  }, [layoutStore]);

  return (
    <div>
      <h3 className="text-lg my-2">
        🚀 Choose your platform and follow the steps to start tracking your
        Convene Record! 📈
      </h3>
      <Tabs defaultValue="pc" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="pc">PC</TabsTrigger>
          <TabsTrigger value="android">Android</TabsTrigger>
          <TabsTrigger value="ios">IOS</TabsTrigger>
        </TabsList>
        <Alert className="mt-4" variant="warning">
          <AlertTitle className="flex items-center gap-2 font-bold text-lg">
            <TriangleAlert className="size-5" />
            Important Update on the Convene Record History!
            <TriangleAlert className="size-5" />
          </AlertTitle>
          <AlertDescription>
            <p>
              Starting
              {' '}
              <strong>November 22, 2024</strong>
              , the WuWa server will
              begin
              <strong>
                {' '}
                deleting convene history data older than 6 months
                {' '}
              </strong>
              .
            </p>
            <p>
              🗓️ For example, if you are a Day 1 player and pulled on
              {' '}
              <strong>May 22, 2024</strong>
              , those pulls will be
              {' '}
              <strong>deleted on November 22, 2024</strong>
              {' '}
              from
              <strong> the WuWa server</strong>
              .
            </p>
            <p>
              <strong>✨ WuWaPal</strong>
              {' '}
              will handle this issue for you. but
              keeping a
              <strong>backup</strong>
              {' '}
              is always a smart move! 💾✔️.
            </p>
            <p>
              You can do it from
              {' '}
              <Link className="font-bold text-primary underline" href="/settings">
                Settings
              </Link>
              {' '}
              page 👈.
            </p>
          </AlertDescription>
        </Alert>

        <TabsContent value="pc">
          <PCMethodList
            conveneRecordURL={conveneRecordURL}
            handleRecordURLChange={handleRecordURLChange}
            gamePath={gamePath}
            handleGamePathChange={handleGamePathChange}
          />
        </TabsContent>
        <TabsContent value="android">
          <AndroidMethodList
            conveneRecordURL={conveneRecordURL}
            handleRecordURLChange={handleRecordURLChange}
          />
        </TabsContent>
        <TabsContent value="ios">
          <IOSMethodList setConveneRecordURL={setConveneRecordURL} />
        </TabsContent>
      </Tabs>
      <div className="md:ml-28 ml-12 mt-4">
        <ImportBtn gachaUrl={conveneRecordURL} gamePath={gamePath} />
      </div>
    </div>
  );
}
