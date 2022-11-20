import React, { useState, useEffect } from 'react';
import { authService, dbService } from '../fbase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

import Article from '../components/molecules/FirebaseBoard';
import FirebaseManager from '../components/molecules/FirebaseManager';
import Header from 'src/components/templates/Header';
import { Box, Text } from '@chakra-ui/react';

function Freeboard() {
  const [userObj, setUserObj] = useState();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setUserObj(authService.currentUser);
  }, [userObj]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'articles'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, snapshot => {
      const articleArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articleArr);
    });
  }, []);
  return (
    <Box>
      <Box mt={100}></Box>
      {userObj ? (
        <Text>{userObj.displayName} 님 안녕하세요</Text>
      ) : (
        '로그인해주세요'
      )}
      <FirebaseManager userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {articles.map(article => (
          <Article
            key={article.id}
            articleObj={article}
            isOwner={article.creatorId === userObj.uid}
          />
        ))}
      </div>
    </Box>
  );
}
export default Freeboard;
