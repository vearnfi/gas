import type {BigNumber} from "bignumber.js";
import {makeBaseGasPrice} from "./base-gas-price";
import {intrinsicGas} from "./intrinsic-gas";
import {makeVmGas} from "./vm-gas";
import {calcTxFee} from "./calc-tx-fee";

type Options = {
  caller?: string;
  gasPriceCoef?: number;
};

const defaultOptions = {
  gasPriceCoef: 0,
};

export type Estimate = (
  clauses: Connex.VM.Clause[],
  _options?: Options,
) => Promise<BigNumber>;

export function makeEstimate(nodeOrConnex: Connex | string): Estimate {
  return async function estimate(
    clauses: Connex.VM.Clause[],
    _options: Options = {},
  ): Promise<BigNumber> {
    const options = {
      caller: _options.caller || undefined,
      gasPriceCoef: _options.gasPriceCoef || defaultOptions.gasPriceCoef,
    };

    const baseGasPrice = makeBaseGasPrice(nodeOrConnex);
    const baseGas = await baseGasPrice();
    const intrinsic = intrinsicGas(clauses);
    const vmGas = makeVmGas(nodeOrConnex);
    const vm = await vmGas(clauses, options.caller);

    const txGas = intrinsic + vm;

    return calcTxFee(txGas, baseGas, options.gasPriceCoef);
  };
}
