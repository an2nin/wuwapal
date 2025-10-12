import CustomListItem from '@/shared/components/custom-list-item';

export default function AndroidMethodTermux() {
  return (
    <CustomListItem
      title="Use Termux App To Get Convene Record URL"
      index={1}
    >
      <div>
        Similar to accessing your history in Genshin Impact or Honkai
        Star Rail, follow this guide by
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://gist.github.com/eqdamini/d3accb76dc5e82f9c30d398a9fc5626d"
          className="font-bold underline mx-1"
        >
          eqdamini
        </a>
        to download and use
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://f-droid.org/en/packages/com.termux/"
          className="font-bold underline mx-1"
        >
          Tremux
        </a>
        to obtain your URL.
      </div>
    </CustomListItem>
  );
}
