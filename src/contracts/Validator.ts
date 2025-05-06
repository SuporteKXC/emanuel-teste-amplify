import * as Yup from 'yup';
import { AnyObject } from 'yup/lib/types';

export interface IValidator
  extends Yup.TestFunction<any | undefined, AnyObject> {}
