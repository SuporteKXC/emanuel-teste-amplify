import { getTransitTimeShape } from '../Common';
import * as Yup from 'yup';

export class UpdateTransitTimeValidator {
  public get schema() {
    return Yup.object().shape({
      ...getTransitTimeShape(),
    });
  }
}
