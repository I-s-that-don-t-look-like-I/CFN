import React, { useState } from 'react';
import { v4 } from 'uuid';
import { storageService, dbService } from '../../fbase';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

import { GrClearOption } from 'react-icons/gr';
import { Input } from '@chakra-ui/react';

const FirebaseManager = ({ userObj }) => {
  const [article, setArticle] = useState('');
  const [attachment, setAttachment] = useState('');
  const onSubmit = async event => {
    event.preventDefault();
    if (article === '') {
      return;
    }
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url'
      );
      console.log(response);
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const articleObj = {
      text: article,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, 'articles'), articleObj);

    setArticle('');
    setAttachment('');
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setArticle(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => setAttachment('');

  return (
    <form onSubmit={onSubmit}>
      <div className="factoryInput__container">
        <Input
          className="factoryInput__input"
          value={article}
          onChange={onChange}
          type="text"
          placeholder="내용을 입력해주세요"
          maxLength={120}
          w={500}
        />
        <Input
          type="submit"
          value="&rarr;"
          className="factoryInput__arrow"
          w={50}
        />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>사진 첨부</span>
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt="img"
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            {GrClearOption}{' '}
          </div>
        </div>
      )}
    </form>
  );
};
export default FirebaseManager;
