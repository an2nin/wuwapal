import CustomListItem from '@/shared/components/custom-list-item';

export default function AndroidMethodAirplane() {
  return (
    <>
      <CustomListItem
        title="Open Wuthering Waves on your Android device."
        index={1}
      />
      <CustomListItem
        title="Enable Airplane mode on your Android device."
        index={2}
      />
      <CustomListItem
        title="Open convene history on Wuthering Waves while still in Airplane mode."
        index={3}
      />
      <CustomListItem
        title="Tap and hold to select all the text, then copy it."
        index={4}
      />
      <CustomListItem
        title="Paste the copied text in a text editor and copy the link only"
        index={5}
      />
      <CustomListItem
        title="Paste the copied link in the WuwaPal Import textbox below."
        index={6}
      />
    </>
  );
}
