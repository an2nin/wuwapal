'use client';

import { useState } from 'react';
import CustomListItem from '@/shared/components/custom-list-item';
import { Input } from '@/shared/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { SOCIAL_LINKS_OBJ } from '@/shared/constants/social-links';
import AndroidMethodAirplane from './android-method-airplane';
import AndroidMethodAscent from './android-method-ascent';
import AndroidMethodTermux from './android-method-termux';

interface Props {
  conveneRecordURL: string;
  handleRecordURLChange: (value: any) => void;
}

export default function AndroidMethodList({
  conveneRecordURL,
  handleRecordURLChange,
}: Props) {
  const [androidMethod, setAndroidMethod] = useState('airplane');
  return (
    <>
      <div className="md:mx-10 mx-0">
        <h3 className="text-xl font-bold md:text-2xl mt-4 mb-2">
          Choose a method
        </h3>
        <p className="text-muted-foreground">
          If none of the two methods for Android works for you 😢, hit me up on
          {' '}
          <a className="underline" href={SOCIAL_LINKS_OBJ.discord.path}>
            Discord
          </a>
          {' '}
          👾 and I will do my best to help! 💪
        </p>
        <Tabs
          value={androidMethod}
          onValueChange={setAndroidMethod}
          className="w-full my-4"
        >
          <TabsList className="grid grid-cols-3 mt-2 mb-4">
            <TabsTrigger value="airplane">Airplane</TabsTrigger>
            <TabsTrigger value="ascent">Ascent</TabsTrigger>
            <TabsTrigger value="termux">Termux</TabsTrigger>
          </TabsList>
          {androidMethod === 'airplane' && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-foreground">
                ✈️
                {' '}
                <strong>Most reliable and easy method!</strong>
                {' '}
                This approach requires enabling Airplane mode temporarily.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                💡 Method suggested by
                {' '}
                <strong>holovk0</strong>
              </p>
            </div>
          )}
          <ol className="relative border-s ms-3 md:mx-10 mx-0">
            {/* Tabs Content */}
            {androidMethod === 'airplane' && <AndroidMethodAirplane /> }
            {androidMethod === 'ascent' && <AndroidMethodAscent /> }
            {androidMethod === 'termux' && <AndroidMethodTermux /> }
            {/* Common steps */}
            <CustomListItem
              title="Paste the text to the textbox below."
              index={androidMethod === 'airplane' ? '7' : '2'}
            >
              <Input
                placeholder="Paste the text here"
                value={conveneRecordURL}
                onChange={handleRecordURLChange}
              />
            </CustomListItem>
            <CustomListItem
              title="Click on the import button"
              index="F"
              last={true}
            />
          </ol>
        </Tabs>
      </div>
    </>
  );
}
