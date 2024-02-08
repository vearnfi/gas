import { basePrice } from "./base-price"
import { intrinsicGas } from "./intrinsic-gas"
import { vmGas } from "./vm-gas"
import { calcTxFee } from "./calc-tx-fee"

import type { BasePrice } from "./base-price"
import type { IntrinsicGas } from "./intrinsic-gas"
import type { VmGas } from "./vm-gas"
import type { CalcTxFee } from "./calc-tx-fee"

export type Gas = {
  basePrice: BasePrice,
  intrinsicGas: IntrinsicGas,
  vmGas: VmGas,
  calcTxFee: CalcTxFee,
}

export default {
  basePrice,
  intrinsicGas,
  vmGas,
  calcTxFee,
}
