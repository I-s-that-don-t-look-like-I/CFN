const { FirebaseRead } = require('src/components/molecules/FirebaseDbManager');

export const googleToWalletAddr = async _email => {
  const user = await FirebaseRead({
    _collection: 'users',
    _column: 'google_id',
    _value: _email,
    _compOpt: '==',
  });
  if (user) {
    return user.docChanges()[0].doc._document.data.value.mapValue.fields
      .metaAddr.stringValue;
  } else {
    return false;
  }
};
