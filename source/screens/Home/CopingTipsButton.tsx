import * as React from 'react';
import Button from '~/components/Button';
import routes, {useNavigate} from '~/routes';

function CopingTipsButton() {
  const navigate = useNavigate();

  function handleOnPress() {
    const path = routes.copingTips();
    navigate(path);
  }

  return (
    <Button.Icon icon="QnA" size={30} color="black" onPress={handleOnPress} />
  );
}

export default React.memo(CopingTipsButton);
