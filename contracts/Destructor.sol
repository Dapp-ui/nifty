// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

/**
 * Use this class to send eth to a contract
 * Without calling any of said contract's functions
 */
contract Destructor {
    address payable inheritor;

    constructor(address payable inh) {
        inheritor = inh;
    }

    // no-op that just receives funds
    function receiveFunds() public payable {}

    function destroy() public {
        selfdestruct(inheritor);
    }
}
