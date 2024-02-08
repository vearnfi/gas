import {makeBaseGasPrice} from "./base-gas-price";
import {intrinsicGas} from "./intrinsic-gas";
import {makeVmGas} from "./vm-gas";
import {calcTxFee} from "./calc-tx-fee";
import {makeEstimate} from "./estimate";

import type {BaseGasPrice} from "./base-gas-price";
import type {IntrinsicGas} from "./intrinsic-gas";
import type {VmGas} from "./vm-gas";
import type {CalcTxFee} from "./calc-tx-fee";
import type {Estimate} from "./estimate";

export type Gas = Readonly<{
  baseGasPrice: BaseGasPrice;
  intrinsicGas: IntrinsicGas;
  vmGas: VmGas;
  calcTxFee: CalcTxFee;
  estimate: Estimate;
}>;

/**
 * Gas calculation factory function.
 * @param {Connex | string} nodeOrConnex Node or connex instance.
 * @return {Gas}
 */
export function makeGas(
  nodeOrConnex: Connex | string = "https://mainnet.veblocks.net",
) {
  return function gas(): Gas {
    const baseGasPrice = makeBaseGasPrice(nodeOrConnex);
    const vmGas = makeVmGas(nodeOrConnex);
    const estimate = makeEstimate(nodeOrConnex);

    return Object.freeze({
      baseGasPrice,
      intrinsicGas,
      vmGas,
      calcTxFee,
      estimate,
    });
  };
}
