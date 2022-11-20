import React, { useState } from 'react';
import { dbService } from '../../fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const FirebaseBoard = ({ articleObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newArticle, setNewArticle] = useState(articleObj.text);
  const ArticleTextRef = doc(dbService, 'articles', `${articleObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('정말로 삭제하시겠어요?');
    if (ok) {
      await deleteDoc(ArticleTextRef);
    }
  };
  const toggleEditing = () => setEditing(prev => !prev);

  const onSubmit = async event => {
    event.preventDefault();
    await updateDoc(ArticleTextRef, {
      text: newArticle,
    });
    setEditing(false);
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewArticle(value);
  };
  return (
    <Box m={5} w={500} borderWidth="5px" borderRadius="lg">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container articleEdit">
            <Input
              type="text"
              placeholder="Edit your article"
              value={newArticle}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <Input w={100} type="submit" value="Update" className="formBtn" />
            <Button onClick={toggleEditing} className="formBtn cancelBtn">
              Cancel
            </Button>
          </form>
        </>
      ) : (
        <>
          <Text fontSize={30}>{articleObj.text}</Text>
          {articleObj.attachmentUrl && (
            <img alt={articleObj.text} src={articleObj.attachmentUrl} />
          )}
          {isOwner && (
            <Flex fontSize={30} justifyContent={'flex-end'}>
              <span onClick={onDeleteClick}>
                <BsTrash />
              </span>
              <span onClick={toggleEditing}>
                <BsPencilSquare />
              </span>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default FirebaseBoard;
