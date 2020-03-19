// Copyright 2020 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import axios from 'axios';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import Command from '../../../../src/m1_facilitator/commands/Command';
import Manifest from '../../../../src/m1_facilitator/manifest/Manifest';

// Threshold in ether below which avatar account will be funded from faucet.
const AVATAR_ACCOUNT_THRESHOLD = new BigNumber(50);

const FAUCET_URL = 'https://faucet.mosaicdao.org';

enum Chains {
  Goerli = '5',
  Hadapsar = '1405',
}

/**
 * Returns balance of avatar account.
 */
async function checkBalance(account: string, auxWeb3: Web3): Promise<BigNumber> {
  const auxAvatarBalanceWei = await auxWeb3.eth.getBalance(account);
  const auxAvatarBalanceEther = auxWeb3.utils.fromWei(auxAvatarBalanceWei, 'ether');
  return new BigNumber(auxAvatarBalanceEther);
}

export default class FundAvatar implements Command {
  private manifestPath: string;

  /**
   * Construct FundAvatar instance with params.
   *
   * @param manifestPath Path of manifest file.
   */
  public constructor(manifestPath: string) {
    this.manifestPath = manifestPath;
  }

  /**
   * Executes fundAvatar command
   */
  public async execute(): Promise<void> {
    const manifest = Manifest.fromFile(this.manifestPath);
    const acc = manifest.metachain.auxiliaryChain.avatarAccount;
    if ((await checkBalance(acc, manifest.metachain.auxiliaryChain.web3))
      .lt(AVATAR_ACCOUNT_THRESHOLD)) {
      this.fundFromFaucet(acc, Chains.Hadapsar);
    }
  }

  private async fundFromFaucet(beneficiary: string, chain: string): Promise<void> {
    await axios.post(
      FAUCET_URL,
      {
        beneficiary: `${beneficiary}@${chain}`,
      },
    );
  }
}