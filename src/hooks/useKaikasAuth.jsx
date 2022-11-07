import { KaikasAuthContext } from 'src/contexts/KaikasAuthContext';
import { useContext } from 'react';

function useKaikasAuth() {
  return useContext(KaikasAuthContext);
}

export default useKaikasAuth;
