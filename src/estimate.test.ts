import type {BigNumber} from "bignumber.js";
import {makeEstimate} from "./estimate";
import type {Estimate} from "./estimate";
import {VM_GAS} from "./constants";

function scaleGas(gas: BigNumber): number {
  return gas.dividedBy(1e13).decimalPlaces(0).toNumber();
}

describe("intrinsic(clause[])", () => {
  let estimate: Estimate;

  beforeEach(() => {
    estimate = makeEstimate("https://mainnet.veblocks.net");
  });

  it("calculates correctly a test clause with gasPriceCoef of 0", async () => {
    const gas = await estimate([
      {
        to: "0x0000000000000000000000000000456E65726779",
        value: "0x01",
        data: "0x",
      },
    ]);

    expect(scaleGas(gas)).toEqual(21046 + VM_GAS);
  });

  it("calculates correctly a test clause with gasPriceCoef of 255", async () => {
    const gas = await estimate(
      [
        {
          to: "0x0000000000000000000000000000456E65726779",
          value: "0x01",
          data: "0x",
        },
      ],
      {gasPriceCoef: 255},
    );

    expect(scaleGas(gas)).toEqual(72092);
  });

  it("calculates correctly a pure vet test clause with gasPriceCoef of 0", async () => {
    const gas = await estimate([
      {
        to: "0x1A6f69Bb160c199B1862c83291d364836558AE8F",
        value: "0x0",
        data: "0x",
      },
    ]);

    expect(scaleGas(gas)).toEqual(21000);
  });

  it("calculates correctly a contract deployment test clause with gasPriceCoef of 128", async () => {
    const gas = await estimate(
      [
        {
          to: null,
          value: "0",
          data: "0x60806040523480156200001157600080fd5b50604051806040016040528060118152602001705665436861696e456e6572677944656d6f60781b815250604051806040016040528060038152602001622b22a760e91b8152508160039080519060200190620000709291906200026c565b508051620000869060049060208401906200026c565b50506005805460ff19169055506200009e33620000cc565b620000c633620000b16012600a62000427565b620000c090620f42406200043f565b62000126565b620004b9565b600580546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216620001825760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064015b60405180910390fd5b6200019060008383620001fb565b8060026000828254620001a4919062000461565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b6200020562000222565b6200021d8383836200021d60201b620008361760201c565b505050565b60055460ff16156200026a5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640162000179565b565b8280546200027a906200047c565b90600052602060002090601f0160209004810192826200029e5760008555620002e9565b82601f10620002b957805160ff1916838001178555620002e9565b82800160010185558215620002e9579182015b82811115620002e9578251825591602001919060010190620002cc565b50620002f7929150620002fb565b5090565b5b80821115620002f75760008155600101620002fc565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620003695781600019048211156200034d576200034d62000312565b808516156200035b57918102915b93841c93908002906200032d565b509250929050565b600082620003825750600162000421565b81620003915750600062000421565b8160018114620003aa5760028114620003b557620003d5565b600191505062000421565b60ff841115620003c957620003c962000312565b50506001821b62000421565b5060208310610133831016604e8410600b8410161715620003fa575081810a62000421565b62000406838362000328565b80600019048211156200041d576200041d62000312565b0290505b92915050565b60006200043860ff84168362000371565b9392505050565b60008160001904831182151516156200045c576200045c62000312565b500290565b6000821982111562000477576200047762000312565b500190565b600181811c908216806200049157607f821691505b60208210811415620004b357634e487b7160e01b600052602260045260246000fd5b50919050565b61128180620004c96000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c8063613255ab116100c357806395d89b411161007c57806395d89b41146102b0578063a457c2d7146102b8578063a9059cbb146102cb578063d9d98ce4146102de578063dd62ed3e146102f1578063f2fde38b1461030457600080fd5b8063613255ab1461022857806370a082311461023b578063715018a61461026457806379cc67901461026c5780638456cb591461027f5780638da5cb5b1461028757600080fd5b8063395093511161011557806339509351146101c75780633f4ba83a146101da57806340c10f19146101e457806342966c68146101f75780635c975abb1461020a5780635cffe9de1461021557600080fd5b806306fdde0314610152578063095ea7b31461017057806318160ddd1461019357806323b872dd146101a5578063313ce567146101b8575b600080fd5b61015a610317565b6040516101679190610f71565b60405180910390f35b61018361017e366004610fdb565b6103a9565b6040519015158152602001610167565b6002545b604051908152602001610167565b6101836101b3366004611007565b6103c1565b60405160128152602001610167565b6101836101d5366004610fdb565b6103e5565b6101e2610407565b005b6101e26101f2366004610fdb565b610419565b6101e2610205366004611048565b61042f565b60055460ff16610183565b610183610223366004611061565b61043c565b610197610236366004611100565b610634565b610197610249366004611100565b6001600160a01b031660009081526020819052604090205490565b6101e2610662565b6101e261027a366004610fdb565b610674565b6101e2610689565b60055461010090046001600160a01b03166040516001600160a01b039091168152602001610167565b61015a610699565b6101836102c6366004610fdb565b6106a8565b6101836102d9366004610fdb565b610723565b6101976102ec366004610fdb565b610731565b6101976102ff36600461111d565b610795565b6101e2610312366004611100565b6107c0565b60606003805461032690611156565b80601f016020809104026020016040519081016040528092919081815260200182805461035290611156565b801561039f5780601f106103745761010080835404028352916020019161039f565b820191906000526020600020905b81548152906001019060200180831161038257829003601f168201915b5050505050905090565b6000336103b781858561083b565b5060019392505050565b6000336103cf85828561095f565b6103da8585856109d9565b506001949350505050565b6000336103b78185856103f88383610795565b61040291906111a7565b61083b565b61040f610b88565b610417610be8565b565b610421610b88565b61042b8282610c3a565b5050565b6104393382610d05565b50565b600061044785610634565b8411156104af5760405162461bcd60e51b815260206004820152602b60248201527f4552433230466c6173684d696e743a20616d6f756e742065786365656473206d60448201526a30bc233630b9b42637b0b760a91b60648201526084015b60405180910390fd5b60006104bb8686610731565b90506104c78786610c3a565b6040516323e30c8b60e01b81527f439148f0bbc682ca079e46d6e2c2f0c1e3b820f1a291b069d8882abf8cf18dd9906001600160a01b038916906323e30c8b9061051f9033908b908b9088908c908c906004016111bf565b602060405180830381600087803b15801561053957600080fd5b505af115801561054d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610571919061121b565b146105ca5760405162461bcd60e51b8152602060048201526024808201527f4552433230466c6173684d696e743a20696e76616c69642072657475726e2076604482015263616c756560e01b60648201526084016104a6565b60006105e088306105db858a6111a7565b61095f565b8115806105f457506001600160a01b038116155b156106115761060c8861060784896111a7565b610d05565b610626565b61061b8887610d05565b6106268882846109d9565b506001979650505050505050565b60006001600160a01b038216301461064d57600061065c565b60025461065c90600019611234565b92915050565b61066a610b88565b6104176000610e43565b61067f82338361095f565b61042b8282610d05565b610691610b88565b610417610e9d565b60606004805461032690611156565b600033816106b68286610795565b9050838110156107165760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104a6565b6103da828686840361083b565b6000336103b78185856109d9565b60006001600160a01b038316301461078b5760405162461bcd60e51b815260206004820152601b60248201527f4552433230466c6173684d696e743a2077726f6e6720746f6b656e000000000060448201526064016104a6565b60005b9392505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6107c8610b88565b6001600160a01b03811661082d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104a6565b61043981610e43565b505050565b6001600160a01b03831661089d5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104a6565b6001600160a01b0382166108fe5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104a6565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600061096b8484610795565b905060001981146109d357818110156109c65760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104a6565b6109d3848484840361083b565b50505050565b6001600160a01b038316610a3d5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104a6565b6001600160a01b038216610a9f5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104a6565b610aaa838383610eda565b6001600160a01b03831660009081526020819052604090205481811015610b225760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104a6565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36109d3565b6005546001600160a01b036101009091041633146104175760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104a6565b610bf0610ee2565b6005805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b038216610c905760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104a6565b610c9c60008383610eda565b8060026000828254610cae91906111a7565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b6001600160a01b038216610d655760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016104a6565b610d7182600083610eda565b6001600160a01b03821660009081526020819052604090205481811015610de55760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016104a6565b6001600160a01b0383166000818152602081815260408083208686039055600280548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3505050565b600580546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610ea5610f2b565b6005805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610c1d3390565b610836610f2b565b60055460ff166104175760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104a6565b60055460ff16156104175760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104a6565b600060208083528351808285015260005b81811015610f9e57858101830151858201604001528201610f82565b81811115610fb0576000604083870101525b50601f01601f1916929092016040019392505050565b6001600160a01b038116811461043957600080fd5b60008060408385031215610fee57600080fd5b8235610ff981610fc6565b946020939093013593505050565b60008060006060848603121561101c57600080fd5b833561102781610fc6565b9250602084013561103781610fc6565b929592945050506040919091013590565b60006020828403121561105a57600080fd5b5035919050565b60008060008060006080868803121561107957600080fd5b853561108481610fc6565b9450602086013561109481610fc6565b935060408601359250606086013567ffffffffffffffff808211156110b857600080fd5b818801915088601f8301126110cc57600080fd5b8135818111156110db57600080fd5b8960208285010111156110ed57600080fd5b9699959850939650602001949392505050565b60006020828403121561111257600080fd5b813561078e81610fc6565b6000806040838503121561113057600080fd5b823561113b81610fc6565b9150602083013561114b81610fc6565b809150509250929050565b600181811c9082168061116a57607f821691505b6020821081141561118b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156111ba576111ba611191565b500190565b6001600160a01b03878116825286166020820152604081018590526060810184905260a06080820181905281018290526000828460c0840137600060c0848401015260c0601f19601f8501168301019050979650505050505050565b60006020828403121561122d57600080fd5b5051919050565b60008282101561124657611246611191565b50039056fea2646970667358221220399c874bfc409cd802118f3324fb28966918151e39b10f53b321d907db8bdc4964736f6c63430008090033",
        },
      ],
      {gasPriceCoef: 128},
    );

    expect(scaleGas(gas)).toEqual(2283402);
  });
});
