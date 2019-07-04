import * as commander from 'commander';
import Logger from '../Logger';
import Facilitator from '../Facilitator';
import { Config } from '../Config';
import FacilitatorStart from './FacilitatorStart';


const facilitatorCmd = commander
  .arguments('[origin_chain] [aux_chain_id]');

facilitatorCmd
  .option('-mc, --mosaic-config <mosaicConfig>', 'path to mosaic configuration')
  .option('-fc, --facilitator-config <facilitatorConfig>', 'path to facilitator configuration')
  .action(async (origin_chain, aux_chain_id, options) => {
    let configObj: Config;

    try {
      configObj = FacilitatorStart.getConfig(origin_chain, aux_chain_id, options);
      const facilitator: Facilitator = new Facilitator(configObj);
      await facilitator.start();

      Logger.info('facilitator started');
    } catch (err) {
      Logger.error(err.message);
    }
  })
  .parse(process.argv);