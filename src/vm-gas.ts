import bent from "bent";
import {VM_GAS} from "./constants";

export type VmGas = (
  clauses: Connex.VM.Clause[],
  _caller?: string,
) => Promise<number>;

/**
 * Estimate units of gas used to execute the given set of clauses. This
 * is a measure of the amount of bytes being written to the blockchain (storage).
 * @notice it is impossible to calculate the VM gas offline, which is
 * why a simulation is required. This involves sending the clause
 * data to a node, and the return will include details about the gas
 * consumed.
 * @param {Connex | string} nodeOrConnex
 * @return {VmGas}
 * @see https://github.com/vechain/connex/blob/c00bfc1abec3572c7d1df722bf8a7dfb14295102/packages/driver/src/driver.ts#L165
 */
export function makeVmGas(nodeOrConnex: Connex | string): VmGas {
  return async function vmGas(
    clauses: Connex.VM.Clause[],
    _caller?: string,
  ): Promise<number> {
    // set default caller for contract creation, because address(0) will revert and return too little gas
    const caller =
      !_caller && clauses.some(({to}) => !to)
        ? "0x0000000000000000000000000000000000000001"
        : _caller;

    // get base price via HTTP request
    if (typeof nodeOrConnex === "string") {
      const postNode = bent(nodeOrConnex, "POST", "json", 200);
      const response = await postNode("/accounts/*", {clauses, caller});

      if (!Array.isArray(response)) {
        return 0;
      }

      const gas = response.reduce(
        (gas, output) => gas + output.gasUsed,
        VM_GAS,
      );
      return gas === VM_GAS ? 0 : gas;
    }

    // alternatively, use connex
    const explainer = nodeOrConnex.thor.explain(clauses);

    if (caller !== undefined) {
      explainer.caller(caller);
    }

    const outputs = await explainer.execute();
    const gas = outputs.reduce((gas, output) => gas + output.gasUsed, VM_GAS);

    return gas === VM_GAS ? 0 : gas;
  };
}
