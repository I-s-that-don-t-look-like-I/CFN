import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { dbService } from 'src/fbase';

export async function FirebaseWrite({ _collection, _dataObj }) {
  const response = await addDoc(collection(dbService, _collection), _dataObj);
  // console.log(response._key.path);
  return response._key.path;
}

export async function FirebaseRead({ _collection, _column, _value, _compOpt }) {
  const q = query(
    collection(dbService, _collection),
    where(_column, _compOpt, _value)
  );

  const querySnapshot = await getDocs(q);
  // querySnapshot.forEach(doc => {
  //   console.log(doc.id, ' => ', doc.data());
  // });
  return querySnapshot;
}

export async function FirebaseReadAll(_collection) {
  const q = query(collection(dbService, _collection));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach(doc => {
    console.log(doc.id, ' => ', doc.data());
  });
}

export async function FirebaseGoogleLogin({
  _googleId,
  _googleName,
  _googleProfileUrl,
  _googleUid,
}) {
  const user = await FirebaseRead({
    _collection: 'users',
    _column: 'google_id',
    _value: _googleId,
    _compOpt: '==',
  });
  const idCount = user._snapshot.docChanges.length;
  if (idCount > 1) {
    alert('동일 이메일 계정이 2개 이상 존재합니다. 관리자에게 문의하세요');
  } else if (idCount === 1) {
    alert('기존에 가입한 내역이 존재합니다.');
  } else if (idCount === 0) {
    FirebaseWrite({
      _collection: 'users',
      _dataObj: {
        google_id: _googleId,
        google_name: _googleName,
        google_ProfileUrl: _googleProfileUrl,
        google_uid: _googleUid,
        created_at: Date.now(),
      },
    });
  } else {
    alert('이메일 계정 조회 중 알 수 없는 오류 발생');
  }
}
