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

import path from 'path';
import { execSync } from 'child_process';

describe('Facilitator stop ', () => {
  it('should stop facilitator', () => {
    const killFacilitator = path.join(__dirname, '..', 'kill_facilitator_process.sh');
    execSync(
      ` sh ${killFacilitator}`,
      { stdio: [process.stdout, process.stderr], env: process.env },
    );
  });
});