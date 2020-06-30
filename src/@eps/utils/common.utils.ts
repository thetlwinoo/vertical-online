export class CommonUtils {
  public static findById(data, id): any {
    if (!data || !id) {
      return null;
    }
    for (const datum of data) {
      if (datum.id === id) {
        return datum;
      }
      if (datum.children) {
        const result = this.findById(datum.children, id);
        if (result) {
          return result;
        }
      }
    }
  }

  public static ObjectToString(data): string {
    return Object.keys(data)
      .filter(item => {
        if (data[item] === true) {
          return item;
        }
      })
      .join(',');
  }

  public static getKeys(value: any): any[] {
    return Object.keys(value);
  }

  public static getValues(value: any): any[] {
    const keys = Object.keys(value);
    return keys.map(k => value[k]);
  }

  // public static StringToObject(data: string, separator: string): any {
  //   data.split(separator).map(item=>{

  //   })
  // }
}
