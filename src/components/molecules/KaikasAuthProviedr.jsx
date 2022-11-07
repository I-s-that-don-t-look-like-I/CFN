import { KaikasAuthContext } from 'src/contexts/KaikasAuthContext';
import { useState } from 'react';

export default function KaikasAuthPorvider({ children }) {
  const [user, setUser] = useState('');
  return (
    <KaikasAuthContext.Provider value={{ user, setUser }}>
      {children}
    </KaikasAuthContext.Provider>
  );
}
