import { TArgs, TArgsWithParams } from 'types/interfaces';

export function createPath(args: TArgs) {
    // Save some CPU power for routes without params
    if (args.hasOwnProperty('params') === false) return args.path;
  
    // Create a path by replacing params in the route definition
    return Object.entries((args as TArgsWithParams).params).reduce(
      (previousValue: string, [param, value]) =>
        previousValue.replace(`:${param}`, '' + value),
      args.path
    );
  }