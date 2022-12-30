export const DataABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'cContract',
    outputs: [
      {
        internalType: 'contract CrowdfundContract',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_imgUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_synopsis',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_tgAmt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_voteStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_voteEndTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endTime',
        type: 'uint256',
      },
    ],
    name: 'changeCrowdfundData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'enum DBContract.eStatus',
        name: '_BeforeStatus',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_BeforeIdx',
        type: 'uint256',
      },
      {
        internalType: 'enum DBContract.eStatus',
        name: '_AfterStatus',
        type: 'uint8',
      },
    ],
    name: 'changeStatusCrowdfund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum DBContract.eStatus',
        name: '_status',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'findIdxStatusCrowdfund',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContracts',
    outputs: [
      {
        internalType: 'contract CrowdfundContract',
        name: '',
        type: 'address',
      },
      {
        internalType: 'contract RewardContract',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractsAddrs',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getCrowdfundByFilmName',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'filmName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'director',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'imgUrl',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'synopsis',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'targetAmount',
            type: 'uint256',
          },
          {
            internalType: 'enum DBContract.eStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'voteStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'voteEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pros',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cons',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'aPros',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'aCons',
            type: 'address[]',
          },
        ],
        internalType: 'struct DBContract.sCrowdfund',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'getCrowdfundByIdx',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'filmName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'director',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'imgUrl',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'synopsis',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'targetAmount',
            type: 'uint256',
          },
          {
            internalType: 'enum DBContract.eStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'voteStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'voteEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pros',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cons',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'aPros',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'aCons',
            type: 'address[]',
          },
        ],
        internalType: 'struct DBContract.sCrowdfund',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getCrowdfundIdxByFilmName',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum DBContract.eStatus',
        name: '_status',
        type: 'uint8',
      },
    ],
    name: 'getCrowdfundListByStatus',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'filmName',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'director',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'imgUrl',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'synopsis',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'targetAmount',
            type: 'uint256',
          },
          {
            internalType: 'enum DBContract.eStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'voteStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'voteEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'pros',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cons',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'aPros',
            type: 'address[]',
          },
          {
            internalType: 'address[]',
            name: 'aCons',
            type: 'address[]',
          },
        ],
        internalType: 'struct DBContract.sCrowdfund[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getFundReceiptLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getFundReceiptList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'itemIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'enum DBContract.eReceiptStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct DBContract.sFundReceipt[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getFundingItemList',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainAmount',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'content',
            type: 'string[]',
          },
          {
            internalType: 'enum DBContract.eOptions[]',
            name: 'rewards',
            type: 'uint8[]',
          },
        ],
        internalType: 'struct DBContract.sFundingItem[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'enum DBContract.eOptions',
        name: '_opt',
        type: 'uint8',
      },
    ],
    name: 'getRewardOptionAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getTimes',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
    ],
    name: 'getUserToFundRecordList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'itemIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'enum DBContract.eReceiptStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct DBContract.sFundReceipt[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_itemIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_totalPrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
      {
        internalType: 'enum DBContract.eReceiptStatus',
        name: '_status',
        type: 'uint8',
      },
    ],
    name: 'pushFundReceiptList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_itemIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_totalPrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256',
      },
      {
        internalType: 'enum DBContract.eReceiptStatus',
        name: '_status',
        type: 'uint8',
      },
    ],
    name: 'pushUserToFundReceiptList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rContract',
    outputs: [
      {
        internalType: 'contract RewardContract',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_idx',
        type: 'uint256',
      },
    ],
    name: 'removeFundingItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_crowdfund',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_reward',
        type: 'address',
      },
    ],
    name: 'setContracts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'string[]',
        name: '_content',
        type: 'string[]',
      },
      {
        internalType: 'enum DBContract.eOptions[]',
        name: '_options',
        type: 'uint8[]',
      },
    ],
    name: 'setFundingItem',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainAmount',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'content',
            type: 'string[]',
          },
          {
            internalType: 'enum DBContract.eOptions[]',
            name: 'rewards',
            type: 'uint8[]',
          },
        ],
        internalType: 'struct DBContract.sFundingItem',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'remainAmount',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'content',
            type: 'string[]',
          },
          {
            internalType: 'enum DBContract.eOptions[]',
            name: 'rewards',
            type: 'uint8[]',
          },
        ],
        internalType: 'struct DBContract.sFundingItem',
        name: '_fundingItem',
        type: 'tuple',
      },
    ],
    name: 'setFundingItemList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_director',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_imgUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_synopsis',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_tgAmt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_voteStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_voteEndTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endTime',
        type: 'uint256',
      },
    ],
    name: 'setNewCrowdfund',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'enum DBContract.eOptions[]',
        name: '_options',
        type: 'uint8[]',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'setOptionAmountList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: '_side',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_count',
        type: 'uint256',
      },
    ],
    name: 'setProsCons',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_str1',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_str2',
        type: 'string',
      },
    ],
    name: 'stringCompare',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_idx',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'subRemainItemAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const DataUserABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
    ],
    name: 'getUser',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'nickName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'points',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'string[]',
            name: 'aFundedList',
            type: 'string[]',
          },
          {
            internalType: 'string[]',
            name: 'aCrowdfundVoteList',
            type: 'string[]',
          },
        ],
        internalType: 'struct DBUserContract.sUser',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getUserVoteList',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'pushUserFundedList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'pushUserVoteList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_points',
        type: 'uint256',
      },
    ],
    name: 'setPointAdd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_points',
        type: 'uint256',
      },
    ],
    name: 'setPointSub',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_nickName',
        type: 'string',
      },
    ],
    name: 'setUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: '_side',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_count',
        type: 'uint256',
      },
    ],
    name: 'setUserVoteList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const crowdfundABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_DBCont',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_DBUserCont',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'enum DBContract.eStatus',
        name: '_status',
        type: 'uint8',
      },
    ],
    name: 'ForceChangeCrowdfundStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_points',
        type: 'uint256',
      },
    ],
    name: 'addPoints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_itemIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'buyFundItem',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_idx',
        type: 'uint256',
      },
    ],
    name: 'deleteFundingItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getTotalPriceByFilmName',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
    ],
    name: 'getUserReceiptList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'itemIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'enum DBContract.eReceiptStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct DBContract.sFundReceipt[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_userAddr',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'getUserVoteCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_imgUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_synopsis',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_tgAmt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_voteStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_voteEndTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endTime',
        type: 'uint256',
      },
    ],
    name: 'makeCrowdfund',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'string[]',
        name: '_content',
        type: 'string[]',
      },
      {
        internalType: 'enum DBContract.eOptions[]',
        name: '_options',
        type: 'uint8[]',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'makeFundingItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_nickName',
        type: 'string',
      },
    ],
    name: 'registUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
    ],
    name: 'setCrowdfundStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: '_side',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_count',
        type: 'uint256',
      },
    ],
    name: 'voteCrowdfund',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const rewardABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_dbc',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_dbuc',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'enum DBContract.eOptions',
        name: '_opt',
        type: 'uint8',
      },
    ],
    name: 'mintReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_filmName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_metadataURI',
        type: 'string',
      },
    ],
    name: 'setMetadataURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
