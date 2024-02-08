import type {BigNumber} from "bignumber.js";

export type CalcTxFee = (
  gas: number,
  baseGasPrice: BigNumber,
  gasPriceCoef: number,
) => BigNumber;

/**
 * Calculate tx fee given gas usage, baseGasPrice and the gasPriceCoefficient.
 * CasPriceCoefficient in {0, 85, 255}.
 * @param {number} gas Gas used to execute the tx.
 * @param {BigNumber} baseGasPrice Base gas price fetched from the VeChain
 * Params contract in wei.
 * @param {number} gasPriceCoef Gas price coefficient to determine regular,
 * medium or high gas cost.
 * @return {BigNumber} Total transaction gas cost in wei.
 */
export function calcTxFee(
  gas: number,
  baseGasPrice: BigNumber,
  gasPriceCoef: number,
): BigNumber {
  return baseGasPrice
    .times(gasPriceCoef)
    .idiv(255)
    .plus(baseGasPrice)
    .times(gas);
}
