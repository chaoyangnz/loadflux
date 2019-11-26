import { Action, ActionType, Runnable } from '../action';
import { Context } from '../context';
import { Logger } from '../log';

export function before(callback: Runnable): Action {
  return {
    type: ActionType.BEFORE,
    title: 'before',
    run: async (context: Context) => {
      try {
        await callback(context);
      } catch (e) {
        new Logger('loadflux:before').log(
          `Error occurred at before hook of ${context.$scenario.name}`,
          e,
        );
        throw e;
      }
    },
  };
}

export function after(callback: Runnable): Action {
  return {
    type: ActionType.AFTER,
    title: 'after',
    run: async (context: Context) => {
      try {
        await callback(context);
      } catch (e) {
        new Logger('loadflux:after').log(
          `Error occurred at after hook of ${context.$scenario.name}`,
          e,
        );
        throw e;
      }
    },
  };
}
