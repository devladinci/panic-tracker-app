import * as React from 'react';
import Button from '~/components/Button';
import routes, {useNavigate} from '~/routes';

function ProfileButton() {
  const navigate = useNavigate();

  function handleOnPress() {
    const path = routes.profile();
    navigate(path);
  }

  return (
    <Button.Icon
      icon="Profile"
      size={30}
      color="black"
      onPress={handleOnPress}
    />
  );
}

export default React.memo(ProfileButton);
