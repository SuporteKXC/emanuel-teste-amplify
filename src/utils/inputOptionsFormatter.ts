interface Groups {
  label: string;
  value: string;
}

export function objectToSelectOptions( data: any, propName: string ): Groups[] {
  if(!data) return []
  const nestedProps = propName.split( '.' );
  const validOptions: Groups[] = data.map(
    ( item: any ) => {
      let nestedValue: any = item;
      for ( const prop of nestedProps ) {
        if ( nestedValue.hasOwnProperty( prop ) ) {
          nestedValue = nestedValue[prop];
        } else {
          nestedValue = "";
          break;
        }
      }
      return {
        value: `${item.id}`,
        label: nestedValue !== null ? nestedValue.toString() : ""
      }
    }
  )
  return validOptions
}