import CustomListItem from '@/shared/components/custom-list-item';

export default function AndroidMethodAscent() {
  return (
    <CustomListItem
      title="Use Ascent App To Get Convene Record URL"
      index={1}
    >
      <div>
        Similar to accessing your history in Genshin Impact or Honkai
        Star Rail, follow this guide by
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://gist.github.com/Mirai0009/8615e52e09083de9c0ea2dc00dc62ea8"
          className="font-bold underline mx-1"
        >
          Mirai0009
        </a>
        to download and use
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/4o3F/Ascent"
          className="font-bold underline mx-1"
        >
          Ascent
        </a>
        to obtain your URL.
      </div>
    </CustomListItem>
  );
}
