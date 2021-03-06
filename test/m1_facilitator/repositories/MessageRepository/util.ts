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


import assert from '../../../test_utils/assert';
import Message from '../../../../src/m1_facilitator/models/Message';

const Util = {
  assertMessageAttributes(
    inputMessage: Message,
    expectedMessage: Message,
  ): void {
    assert.strictEqual(
      inputMessage.messageHash,
      expectedMessage.messageHash,
      'messageHash should match',
    );

    assert.strictEqual(
      inputMessage.type,
      expectedMessage.type,
      'type should match',
    );

    assert.strictEqual(
      inputMessage.intentHash,
      expectedMessage.intentHash,
      'Mismatch in intent hash.',
    );

    assert.strictEqual(
      inputMessage.sourceStatus,
      expectedMessage.sourceStatus,
      'sourceStatus should match',
    );

    assert.strictEqual(
      inputMessage.targetStatus,
      expectedMessage.targetStatus,
      'targetStatus should match',
    );

    assert.notStrictEqual(
      inputMessage.feeGasPrice,
      expectedMessage.feeGasPrice,
      'feeGasPrice should match',
    );

    assert.notStrictEqual(
      inputMessage.feeGasLimit,
      expectedMessage.feeGasLimit,
      'feeGasLimit should match',
    );

    assert.strictEqual(
      inputMessage.gatewayAddress,
      expectedMessage.gatewayAddress,
      'gatewayAddress should match',
    );

    const {
      sourceDeclarationBlockNumber: expectedSourceDeclarationBlockNumber,
    } = expectedMessage;

    const {
      sourceDeclarationBlockNumber: inputSourceDeclarationBlockNumber,
    } = inputMessage;

    assert.isOk(
      inputSourceDeclarationBlockNumber
      && expectedSourceDeclarationBlockNumber
      && inputSourceDeclarationBlockNumber.eq(expectedSourceDeclarationBlockNumber),
      'Expected source decalration block number is '
      + `${expectedSourceDeclarationBlockNumber && expectedSourceDeclarationBlockNumber.toString(10)} but got`
      + `${inputSourceDeclarationBlockNumber && inputSourceDeclarationBlockNumber.toString(10)}.`,
    );

    assert.strictEqual(
      inputMessage.createdAt && inputMessage.createdAt.getTime(),
      expectedMessage.createdAt && expectedMessage.createdAt.getTime(),
      'Expected created at time is different than the one received in response',
    );

    assert.isNotNull(
      inputMessage.updatedAt,
      'Updated at should not be null',
    );
  },
};

export default Util;
