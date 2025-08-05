import CustomListItem from '@/shared/components/custom-list-item';
import CopyCardAutomatic from './copy-card-automatic';

export default function PCMethod1() {
  return (
    <>
      <CustomListItem
        title="Open Windows PowerShell and run the following command."
        index={3}
      >
        <CopyCardAutomatic />
      </CustomListItem>
    </>
  );
}
