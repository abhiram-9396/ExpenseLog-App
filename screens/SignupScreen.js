import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function SignupHandler({email, password})
  {
    setIsAuthenticating(true);
    try{
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    }
    catch(error)
    {
      Alert.alert('Authentication Failed!','Unable to create the user. Please check and try again later..');
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating)
  {
    return <LoadingOverlay message="Creating User..." />
  }

  return <AuthContent onAuthenticate={SignupHandler} />;
}

export default SignupScreen;
