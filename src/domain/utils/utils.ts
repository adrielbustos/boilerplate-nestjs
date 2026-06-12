export default abstract class Utils {
  public static objectDiff<T>(obj1: Partial<T>, take: Partial<T>): Partial<T> {
    const diff: Partial<T> = {};
    for (const key in obj1) {
      if (obj1[key] !== take[key]) {
        diff[key] = take[key];
      }
    }
    return diff;
  }
}
