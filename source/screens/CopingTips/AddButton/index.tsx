import * as React from 'react';
import Button from '~/components/Button';
import AddCopingTipModal from '~/components/AddCopingTipModal';

function AddButton() {
  const [showModal, setShowModal] = React.useState(false);

  function handleOnPress() {
    setShowModal(true);
  }

  const handleOnDismiss = React.useCallback(
    () => setShowModal(false),
    [setShowModal],
  );

  return (
    <>
      <Button.Icon icon="Add" size={24} color="black" onPress={handleOnPress} />
      <AddCopingTipModal visible={showModal} onDismiss={handleOnDismiss} />
    </>
  );
}

export default React.memo(AddButton);
